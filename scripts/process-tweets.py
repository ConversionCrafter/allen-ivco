#!/usr/bin/env python3
"""Process bird search JSON and store tweets in Payload CMS CompanyEvents."""

import argparse
import json
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Path to bird JSON results file")
    parser.add_argument("--api", required=True, help="Payload API endpoint URL")
    parser.add_argument("--company-id", type=int, required=True, help="Company ID in Payload")
    parser.add_argument("--keyword", required=True, help="Search keyword used")
    args = parser.parse_args()

    # Read tweets from file
    try:
        with open(args.input, "r") as f:
            tweets = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        tweets = []

    if not isinstance(tweets, list):
        tweets = []

    stored = 0
    for t in tweets:
        tweet_id = t.get("id", "")
        text = t.get("text", "")
        created_at = t.get("createdAt", "")
        author = t.get("author", {})
        username = author.get("username", "unknown")
        name = author.get("name", "unknown")
        url = f"https://x.com/{username}/status/{tweet_id}"

        # Convert Twitter date to ISO
        try:
            dt = datetime.strptime(created_at, "%a %b %d %H:%M:%S %z %Y")
            iso_date = dt.isoformat()
        except (ValueError, TypeError):
            iso_date = datetime.now(timezone.utc).isoformat()

        # Title: first 80 chars, single line
        title_text = text.replace("\n", " ")[:80]
        title = f"[X/@{username}] {title_text}"

        payload = json.dumps({
            "company": args.company_id,
            "event_date": iso_date,
            "source": "x-twitter",
            "importance": "medium",
            "title": title,
            "summary": text,
            "raw_content": f"@{username} ({name}): {text}",
            "source_url": url,
            "keywords": args.keyword,
            "ivc_impact": "pending",
        }).encode("utf-8")

        req = urllib.request.Request(
            args.api,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            resp = urllib.request.urlopen(req)
            if resp.status == 201:
                stored += 1
                print(f"  STORED: {url}", file=sys.stderr)
            else:
                print(f"  WARN: HTTP {resp.status} for {url}", file=sys.stderr)
        except urllib.error.HTTPError as e:
            print(f"  ERROR: HTTP {e.code} for {url}", file=sys.stderr)
        except Exception as e:
            print(f"  ERROR: {e} for {url}", file=sys.stderr)

    # Output count to stdout (captured by bash script)
    print(stored)


if __name__ == "__main__":
    main()
