# CyberLex — MySQL Production Migration, Backup & Disaster Recovery Guide

## 1. Architecture Overview & Engine Specifications
- **Database Engine**: MySQL 8.0+
- **Charset & Collation**: `utf8mb4` / `utf8mb4_unicode_ci`
- **ORM**: Prisma Client v6+ with native MySQL connector
- **Connection Model**: Connection pooling via MySQL connection string (`connection_limit` parameter)

---

## 2. Production Deployment & Schema Synchronization

When deploying new releases of CyberLex to production:

```bash
# 1. Ensure production environment variables are configured
export DATABASE_URL="mysql://<user>:<strong_password>@<db_host>:3306/cyberlex_db?sslmode=require&connection_limit=10"

# 2. Generate Prisma Client bindings
npx prisma generate

# 3. Apply schema updates safely to production
npx prisma db push --skip-generate
# Or if using migration history files:
# npx prisma migrate deploy
```

> **Caution**: Never run `prisma migrate reset` or `prisma db push --force-reset` in a production environment as this will drop the database and destroy all legal records.

---

## 3. Production Backup Strategy

### A. Full Logical Backups (`mysqldump`)
Run `mysqldump` with `--single-transaction` to ensure consistent non-blocking snapshots on InnoDB tables:

```bash
#!/bin/bash
# CyberLex Automated Daily Backup Script
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/cyberlex"
DB_NAME="cyberlex_db"
DB_USER="cyberlex_backup_user"
DB_HOST="localhost"
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${TIMESTAMP}.sql.gz"

mkdir -p ${BACKUP_DIR}

# Execute dump with single-transaction and gzip compression
mysqldump \
  --host=${DB_HOST} \
  --user=${DB_USER} \
  --single-transaction \
  --quick \
  --routines \
  --triggers \
  --events \
  --default-character-set=utf8mb4 \
  ${DB_NAME} | gzip -9 > ${BACKUP_FILE}

# Set strict permissions on backup file
chmod 600 ${BACKUP_FILE}

# Retain backups for 30 days
find ${BACKUP_DIR} -name "${DB_NAME}_backup_*.sql.gz" -mtime +30 -delete

echo "CyberLex backup successfully completed: ${BACKUP_FILE}"
```

### B. Recommended Crontab Setup
Configure daily backups at 02:00 UTC and upload to encrypted offsite storage (e.g., S3/GCS with AES-256):

```cron
0 2 * * * /usr/local/bin/cyberlex-backup.sh >> /var/log/cyberlex-backup.log 2>&1
```

### C. Point-in-Time Recovery (PITR) via Binary Logging
Ensure binary logging is enabled in `/etc/mysql/mysql.conf.d/mysqld.cnf`:

```ini
[mysqld]
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
expire_logs_days = 7
max_binlog_size = 100M
binlog_format = ROW
```

---

## 4. Disaster Recovery & Restoration Procedures

### Step 1: Prepare Clean Database Target
```sql
-- Connect as MySQL administrative user
CREATE DATABASE IF NOT EXISTS cyberlex_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 2: Restore from Compressed Snapshot
```bash
# Decompress and stream directly into MySQL
gunzip < /var/backups/cyberlex/cyberlex_db_backup_20260923_020000.sql.gz | mysql \
  -h localhost \
  -u cyberlex_user \
  -p \
  cyberlex_db
```

### Step 3: Replay Binary Logs for Point-in-Time Recovery
If recovering after an incident at 14:35:00 UTC:

```bash
mysqlbinlog \
  --start-datetime="2026-09-23 02:00:00" \
  --stop-datetime="2026-09-23 14:34:59" \
  /var/log/mysql/mysql-bin.0000* | mysql -u cyberlex_user -p cyberlex_db
```

### Step 4: Verify Database Integrity
Run the verification check script:
```bash
npm run test:qa
# Or run schema inspection:
npx prisma studio --browser none --port 5555
```

---

## 5. Managed Cloud Database Recommendations (AWS RDS / Cloud SQL)
When deploying to managed cloud platforms:
- **Automated Backups**: Enable automated daily snapshots with 14–30 day retention.
- **Multi-AZ / High Availability**: Enable automated failover replication.
- **Encryption at Rest**: Enable AWS KMS or Google Cloud KMS managed encryption.
- **Connection Security**: Enforce SSL/TLS (`sslmode=require` or `sslmode=verify-full`).
