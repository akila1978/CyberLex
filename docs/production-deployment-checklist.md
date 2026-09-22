# CyberLex — Production Deployment Checklist & Operations Runbook

## Deployment Decision Gate: PRODUCTION-READY (HARDENED)

---

### 1. Domain Configuration
- [ ] **DNS Records**:
  - Apex `A` record pointing to production load balancer / ingress IP.
  - `CNAME` for `www.cyberlex.io` pointing to apex domain or hosting provider target.
  - Set DNS TTL to 300 seconds during migration, increasing to 3600 seconds post-stabilization.
  - CAA records configured for authorized Certificate Authorities (e.g., Let's Encrypt / DigiCert).

---

### 2. HTTPS & TLS Termination
- [ ] **TLS Version**: Enforce TLS 1.3 (minimum TLS 1.2 with secure cipher suites).
- [ ] **Strict-Transport-Security (HSTS)**: Active in `next.config.ts`:
  - `max-age=63072000; includeSubDomains; preload`.
- [ ] **Security Headers**:
  - `Content-Security-Policy` with nonces/hashes, restrictive base-uri, frame-ancestors 'none'.
  - `X-Frame-Options: DENY`.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`.

---

### 3. MySQL Database Strategy
- [ ] **Version**: MySQL 8.0+ running on InnoDB engine.
- [ ] **Collation**: `utf8mb4_unicode_ci` / `utf8mb4`.
- [ ] **Connection Security**: Enforce SSL connections (`sslmode=require`).
- [ ] **Prisma Migration**: Run `npx prisma db push --skip-generate` or `npx prisma migrate deploy` in CI/CD pipeline.
- [ ] **Connection Pooling**: Configure Prisma connection pool limits (`connection_limit=10-20` based on instance CPU and worker count).

---

### 4. Production Environment Variables (.env)
- [ ] Verify that `.env` is **never committed** to git (`.env*` excluded in `.gitignore`).
- [ ] Production secrets set directly in deployment container / hosting provider secret store:
  - `DATABASE_URL`: `mysql://<user>:<strong_pwd>@<host>:3306/cyberlex_db?sslmode=require`
  - `JWT_SECRET`: Minimum 64-character cryptographically random secret string.
  - `ADMIN_COOKIE_SECRET`: Cryptographically random signing secret.
  - `NEXT_PUBLIC_APP_URL`: `https://cyberlex.io` (or production canonical domain).
  - `UPSTASH_REDIS_REST_URL`: Upstash Redis instance URL for distributed rate limiting.
  - `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis token.
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`: Production transactional mailer.

---

### 5. Production Admin & Editorial Accounts
- [ ] **Purge Dev Credentials**: All default seed credentials (`admin123`, `Admin@123!`) must be changed immediately upon deployment.
- [ ] **Strong Passwords**: Passwords must be 14+ characters containing uppercase, lowercase, numbers, and symbols.
- [ ] **Principle of Least Privilege**: Verify `UserRole` separation (`SUPER_ADMIN`, `ADMIN`, `LEGAL_EDITOR`, `CONTRIBUTOR`).
- [ ] **Session Security**: Session tokens issued with `HttpOnly`, `SameSite=Lax`, and `Secure=true` over HTTPS.

---

### 6. Automated Database Backups & Disaster Recovery
- [ ] **Daily Snapshots**: Automated cron running `mysqldump --single-transaction --quick --routines --triggers | gzip -9`.
- [ ] **Offsite Storage**: Backups encrypted with AES-256 and pushed to AWS S3 / Google Cloud Storage with 30-day retention and object lock.
- [ ] **Point-In-Time Recovery (PITR)**: MySQL binary logging (`ROW` format) enabled with 7-day retention.
- [ ] **Disaster Drill**: Regular quarterly restoration drill documented in `docs/database-backup-restore.md`.

---

### 7. Email Provider & Contact System
- [ ] **Transactional Email Provider**: Resend, SendGrid, Amazon SES, or Postmark.
- [ ] **Domain Verification**: SPF, DKIM, and DMARC (`v=DMARC1; p=reject;`) records fully validated for sender domain.
- [ ] **Feedback/Contact Routing**: Contact submissions routed to verified editorial email with audit trails.

---

### 8. Distributed Rate Limiting & Anti-Abuse
- [ ] **Redis Provider**: Upstash Redis or managed Redis instance configured.
- [ ] **Auth Route Limiting**: Maximum 5 attempts per 15 minutes per IP on `/api/auth/login`.
- [ ] **Contact Route Limiting**: Maximum 3 submissions per hour per IP on `/api/contact`.
- [ ] **Fail-Safe Fallback**: Automatic fail-open memory store fallback with active periodic garbage collection if Redis is momentarily unreachable.

---

### 9. Privacy, Analytics & SEO Verification
- [ ] **Robots Exclusion**:
  - `robots.txt` disallows `/admin`, `/admin/`, `/api/`.
  - `sitemap.xml` dynamic generation includes all published legal content, excluding all admin and private API routes.
  - `src/app/admin/layout.tsx` and `src/app/admin/login/layout.tsx` strictly serve `noindex, nofollow, noimageindex`.
- [ ] **Privacy Compliance**:
  - Privacy-friendly analytics (e.g. Plausible, Fathom, or cookieless tracking) compliant with GDPR and Sri Lanka PDPA.
  - Clear Cookie Policy and Educational Legal Disclaimer present across all page footers.

---

### 10. Monitoring, Health Checks & Observability
- [ ] **Uptime Monitoring**: External synthetic monitor (e.g., Better Uptime, UptimeRobot, Datadog) pinging `/` every 60 seconds.
- [ ] **Application Performance Monitoring (APM)**: Sentry or OpenTelemetry integrated for error tracking and unhandled promise rejections.
- [ ] **Database Connection Health**: Cloud database metric alerts on CPU > 80%, connection pool exhaustion, and slow queries (> 500ms).
- [ ] **Log Ingestion**: Centralized log streaming with sensitive PII and password masking.
