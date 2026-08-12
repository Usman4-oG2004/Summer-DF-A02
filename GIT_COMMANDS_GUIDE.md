# Git Commands & Submission Guide (Assignment #2)

---

## 📌 STEP 1: Git User Setup (Mandatory Rule #3)
> **IMPORTANT:** User name and email **MUST BE IN ALL SMALL CASE**.

Configured Credentials:

```bash
git config --global user.name "ehsanshahid522"
git config --global user.email "l1f22bsse0297@ucp.edu.pk"
```

Verified Config:
- **Username:** `ehsanshahid522`
- **Email:** `l1f22bsse0297@ucp.edu.pk`

---

## 📌 STEP 2: Repository & Feature Branch

- **Team Lead Repo URL:** `https://github.com/Usman4-oG2004/Summer-DF-A02.git`
- **Default Branch:** `develop`
- **Assigned Feature Branch:** `feature/issue#2-products-listing`

Switch to feature branch:
```bash
git checkout feature/issue#2-products-listing
```

---

## 📌 STEP 3: Completed Files & Local Commit

Your task files implemented:
- `products.html` (Products listing page with grid layout)
- `style.css` (Unified shared CSS file)
- `script.js` (Search, filtering, sort, and modal scripts)

Commit command:
```bash
git add products.html style.css script.js
git commit -m "feat(products): create products listing page and update shared style.css"
```

---

## 📌 STEP 4: Push Feature Branch to GitHub

Set remote URL and push:
```bash
git remote set-url origin https://github.com/Usman4-oG2004/Summer-DF-A02.git
git push -u origin feature/issue#2-products-listing
```

---

## 📌 STEP 5: Create Pull Request (PR) & Code Review

1. Visit direct PR link: **https://github.com/Usman4-oG2004/Summer-DF-A02/pull/new/feature/issue%232-products-listing**
2. Target branch: `develop`
3. **Assignee**: `Usman4-oG2004` (Team Lead).
4. **Reviewers**: Add the other 3 group members.
5. Click **Create pull request**.

---

## 📌 STEP 6: Pull Latest Changes to Local Develop Branch

After PR is merged on GitHub:
```bash
git checkout develop
git pull origin develop
```

---

## 📌 STEP 7: Resolve Merge Conflicts (If style.css conflicts occur)

If conflicts happen on `style.css`:
```bash
git checkout feature/issue#2-products-listing
git fetch origin
git merge origin/develop
# Open style.css, resolve conflict markers, save:
git add style.css
git commit -m "fix: resolve style.css merge conflict"
git push origin feature/issue#2-products-listing
```

---

## 📌 STEP 8: Release Branch (For Team Lead)

Once sprint completes, Team Lead creates `release` branch from `develop` and merges into `main` after 4 approvals.
