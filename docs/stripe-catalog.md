# Eula Labs — Stripe catalog (SANDBOX acct_1Ufg7DG5FdP0l52G, created 2026-11-25)

Recreate in live mode after account activation, then wire the site's "Get started" buttons (src/app/page.tsx SERVICES).
Tax: user chose NO sales tax for now (automatic_tax off). Texas "data processing" may apply to monthly plans — CPA question.
All products tax_code txcd_20030000 (general services).

| Service | Product | Price | Test payment link |
|---|---|---|---|
| AI Opportunity Audit $1,500 one-time | prod_VhHIRfhRxsLbr8 | price_1UfsjlG5FdP0l52GsxrhhfGy | https://buy.stripe.com/test_7sYaEX6Z30L7fhvgVR7AI00 (invoice_creation on) |
| AI Front Desk $2,500 setup + $300/mo | prod_VhHIROXekPiK75 + prod_VhHI2AcJzrY9vT | price_1UfsjqG5FdP0l52GHqYrgI2B + price_1UfsjrG5FdP0l52GXqgJxRSo | https://buy.stripe.com/test_8x2eVd3MR51n7P39tp7AI01 |
| Content Engine $997/mo | prod_VhHI5xvNYTMYeJ | price_1UfsjtG5FdP0l52GsP2JN8zM | https://buy.stripe.com/test_8x2cN56Z33Xj6KZ8pl7AI02 |
| AI Ops Partner $2,500/mo | prod_VhHIIphOLZtB5c | price_1UfsjvG5FdP0l52GtWHJYTNt | https://buy.stripe.com/test_6oU4gzdnr8dz4CR7lh7AI03 |
| Automation Build (quote/invoice only) | prod_VhHI9f2P0ZJPa7 | — | — |

Plan (stripe_implementation_planner, guide iguide_61VpGgacGhXQ0LUMM41G5FdP0l52G): Payment Links from site; manual Dashboard
invoices + invoice template; branding; hosted invoice page + reminders; ACH reconciled in Dashboard; Customer Portal;
Smart Retries; Quotes for sales-led deals; free tax threshold monitoring.
