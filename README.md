# Apply to make a tier 1 significant change – prototype

A GOV.UK Prototype Kit prototype for the Department for Education (DfE). Academy trusts use the service to apply to make a tier 1 significant change to an academy, such as adding a sixth form, opening a satellite site or changing pupil numbers.

- **Live prototype:** https://apply-make-significant-change-56c8d58834a9.herokuapp.com/
- **Figma:** *Tier 1 significant change – Trust application journey – working file*, frame "Tier 1 Sig Change as a task list V3 – WORKING VERSION FOR PROTOTYPE"

## Which version to work on

The kit holds three versions of the journey. **Work on V4.**

| Version | Starts at | Views | Status |
|---|---|---|---|
| Linear, one question per page | `/start` | `app/views/` | Older, not being developed |
| V3 task list | `/v3/start` | `app/views/v3/` | Older, kept for comparison |
| **V4 task list** | `/v4/start` | `app/views/v4/` | **Current** |

The prototype's home page (`/`) links to all three.

## Running it

```
npm install
npm run dev
```

Then go to http://localhost:3000/v4/start.

The versions share some answer names in session data, so use **Clear data** (link in the footer) when you switch versions or start a fresh run.

The live prototype is hosted on Heroku. Check the Heroku app's settings for the password and deployment setup.

## How V4 works

### The journey

1. **Start page** (`start.html`) has a note in the Figma saying the real one will be on GOV.UK.
2. **"Before you apply"** (`before-you-apply.html`) is an interruption page about consultations and changes that have already been made.
3. **DfE Sign-in** (`dfe-sign-in.html`, `dfe-sign-in-password.html`) is a mock of the real service's email and password screens, with its black header and Beta banner. Any password works and it isn't stored.
4. **Task list** (`task-list.html`).
5. **Check answers** (`check-answers.html`), then **confirmation**.

### Task list

The sections and tasks are set in `V4_SECTIONS` in `app/routes.js`. Tasks can be done in any order, because the Figma has no locked tasks. Statuses:

- **Not yet started**: nothing submitted yet
- **Incomplete**: at least one page in the task has been submitted. This happens automatically, using `V4_PAGE_TASKS`.
- **Completed**: the last page of the task has been saved. Each task's last route calls `v4Done()`.

"Accept and submit" on check answers is disabled until every task is completed.

| Section | Tasks |
|---|---|
| Check before you start | Consultation status |
| Trust and academy | Trust details, Academy details, Contact details |
| Significant change details | About the significant change, Effective date of the change |
| Consultation | Consultation dates, Consultation summary, Consultation evidence. All three are optional: "If you have not started or completed a consultation leave this blank". |
| Funding | Funding details |
| Consent and permissions | Local authority objections, Consent from religious bodies, Planning permission, Land transaction proposal |
| Admissions variation | Admissions variation details |
| Academy performance | Ofsted, Intervention measures |
| Public Sector Equality Duty Statement | Public Sector Equality Duty Statement |

### About the significant change

This is the most complex task. It covers "Which change do you want to make?", "What do you plan to do?" and then the pages for that type of change. The pages are all in `app/views/v4/change/` and live at `/v4/change/<page>`.

One pair of routes handles every change page. The order of the pages is worked out by `v4ChangePages()` in `routes.js`. **To change the order or branching, edit that function.** It follows the 7 routes in the Figma:

| # | Type of change | Pages after "About the significant change" |
|---|---|---|
| 1 | Boarding | Adding: governance. Then: SEN impact? If yes: SEN provision |
| 2 | Satellite site | SEN impact? If yes: SEN provision. Adding a site: admission and curriculum, governance, physical characteristics, special school satellite? If yes: special school satellite provision |
| 3 | Specialist base | SEN provision. Adding: governance, local authority placements, curriculum offer, parental engagement, pupil outcomes, integration, large specialist base (optional). Removing: Local Area SEND plan |
| 4 | Age range | Add sixth form, all-through, primary, infant or junior, or other: governance. Add sixth form: adding a sixth form, PAN. Remove sixth form: removing a sixth form. Then: SEN impact? If yes: SEN provision |
| 5 | Sex composition | Governance, pupil equity |
| 6 | Type of SEN provision | Governance, SEN provision (there's no "What do you plan to do?" page) |
| 7 | Pupil places | Mainstream: capacity. Other options: SEN provision, Local Area SEND plan |

`app/data/v4-change-pages.json` lists the questions and answer options on each change page. It's used to check that required answers have been given, and to build the "Significant change details" rows on check answers. **If you change a question or option on a change page, update it in the JSON too**, or check answers will show the old wording.

### Answers and check answers

Answers are saved in session data using each field's `name`. Check answers is built by `v4Summary()` in `routes.js`. It only shows rows for questions the person was shown.

## How to…

**Change wording on a page:** edit the HTML in `app/views/v4/`. For change pages, also update `app/data/v4-change-pages.json`.

**Add a question page to an existing task:** copy a similar page, give the form a new `action`, and add a route in `routes.js` that checks the answer and redirects. If the page is the last one in its task, call `v4Done()`. Add the answer to `v4Summary()` so it appears on check answers.

**Add a page to a significant change route:** create `app/views/v4/change/<page>.html` (copy one that's there already), add it to `v4-change-pages.json`, then add it to the right place in `v4ChangePages()`.

**Add a task:** follow the comment above `V4_SECTIONS` in `routes.js`.

**Add a trust or academy to the search:** edit `v3Trusts` or `v3Academies` in `routes.js`. V4 uses the same lists.

## Design decisions and changes

### Built from the Figma (13 October)

- The task list sections, task names and order follow the Figma.
- "Check before you start" covers consultation status only. "Which change" moved into "About the significant change".
- "SEN unit" is renamed "specialist base".
- Ofsted is back under "Academy performance".
- There's a new "Is a land transaction proposal required?" question. "Not applicable" was removed from the planning permission and land transaction questions.
- The copy follows the Figma where it was different from V3.

**Where the Figma was unclear, so we chose:**

- **Pupil places, "What do you plan to do?":** the Figma has two overlapping versions. We used the six V3 options with the Figma wording, and a threshold hint on the four options that aren't mainstream.
- **"Give more details" boxes** appear under the answer Figma shows them under. For example, it's under "No" for "Is the new site big enough?".
- **Start page:** kept the fuller V3 copy.

### Review feedback (13 October)

- Consultation status: if the change has been made and they've told their DO, they can carry on without a consultation.
- Boarding: added "Will this change have an impact on SEN provision?".
- Age range, "What do you plan to do?": radios instead of checkboxes.
- Ofsted outcome: free text box instead of a single line.
- Removed "Get help with this form" from every page.

### 14 October

- Added the "Guidance on support and intervention in schools" link to the intervention measures question (from the Figma).
- Consultation pages: "leave this blank" is now inset text below the field, not hint text (from the Figma).
- Every free text box is limited to 200 words, except "Other email addresses", which keeps a 500-character limit. The word count warns but doesn't stop people continuing.
- Replaced the single mock sign-in page with the two DfE Sign-in screens.

## Known gaps and open questions

- **The Figma doesn't have the review feedback changes yet:** boarding SEN question, age range radios and the Ofsted free text box.
- **No "virus found" upload page.** The Figma marks this screen "Still unsure what this screen will look like". File uploads aren't stored or scanned.
- **The 200-word limit doesn't block saving.** Add server-side checks if research needs it.
- **Boarding (route 1)** had an empty placeholder screen in the Figma. We assumed it was the SEN impact question.
- **Confirmation** always shows the reference TSC-2026-0142.
- `Start page.dc.html` in the repo root isn't used by the kit.
