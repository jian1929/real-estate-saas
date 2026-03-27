# Weekly Lead Report Skill

## Description
Generates and sends weekly lead reports to clients via email.

## Actions
1. Query all new leads from the past week for a user
2. Generate summary statistics (total leads, by source, by price range)
3. Create HTML report with lead details
4. Send report via email using SendGrid/Resend

## Usage
```
Generate weekly report for user [email]
Period: last 7 days
Include: all new leads, statistics, top opportunities
```

## Output
HTML report string + send status
