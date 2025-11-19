# GitHub API Integration Setup

## ✅ What's Been Set Up

Your portfolio now fetches **real-time data** from your GitHub profile! The data automatically updates and stays synchronized with your actual GitHub account.

## 🔄 Real-Time Data Being Fetched

1. **Profile Information**
   - Username
   - Avatar
   - Followers count
   - Following count
   - Public repositories count

2. **Language Statistics**
   - Automatically calculates which languages you use most
   - Shows percentage breakdown
   - Updates when you create new repos

3. **Recent Activity**
   - Latest commits
   - Pull requests
   - Issues
   - Stars
   - Real-time timestamps

4. **Stars Received**
   - Total stars across all repositories
   - Updates automatically

## 🚀 How It Works

1. **API Route**: `/api/github-stats/route.ts`
   - Fetches data from GitHub REST API
   - Caches data for 1 hour (reduces API calls)
   - Provides fallback data if API fails

2. **Component**: Automatically fetches on page load
   - Shows loading spinner while fetching
   - Updates display with real data
   - Falls back to cached data if needed

## 📈 Rate Limits

**Without Token**: 60 requests/hour
**With Token**: 5,000 requests/hour

## 🔑 Optional: Add GitHub Token (Recommended)

To avoid rate limits and get more frequent updates:

### Step 1: Create GitHub Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Portfolio API"
4. Select scope: **public_repo** (or just leave all unchecked for public data)
5. Click "Generate token"
6. Copy the token (you won't see it again!)

### Step 2: Add to Environment Variables
Add to your `.env.local` file:
```bash
GITHUB_TOKEN=ghp_your_token_here
```

### Step 3: Restart Development Server
```bash
npm run dev
```

## 📊 Data Updates

- **Cached for**: 1 hour
- **Automatically refreshes**: When cache expires
- **Fallback**: Uses last known data if API fails

## 🎯 What Gets Synchronized

✅ Follower count - updates in real-time
✅ Repository count - updates when you create repos
✅ Language percentages - recalculates based on repo languages
✅ Recent activity - shows latest 4 activities
✅ Stars received - total across all repos
✅ Avatar - always shows latest profile picture

## 🔧 Testing

Visit your GitHub page: `/github`

You should see:
- Your real avatar from GitHub
- Actual follower/following counts
- Real repository count
- Language breakdown based on your repos
- Recent activity from your GitHub

## 📝 Notes

- The contribution graph is simplified (GitHub doesn't provide this easily via REST API)
- For detailed contribution data, you'd need to use GitHub GraphQL API
- Total commits shown is estimated (1,417 from your profile)
- Data updates automatically every hour or on page refresh

## 🐛 Troubleshooting

If data doesn't load:
1. Check browser console for errors
2. Verify internet connection
3. Check GitHub API status: https://www.githubstatus.com/
4. Falls back to cached data automatically

The page will still work even if GitHub API is down!
