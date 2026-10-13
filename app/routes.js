//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ============================================================
// Linear version
// ============================================================

// --- Has the change already been made? ---
router.post('/path/of/next/page', function (req, res) {
  const answer = req.session.data['hasChangeBeenMade']
  if (answer !== 'yes' && answer !== 'no') {
    return res.render('has-change-been-made', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/contacted-do' : '/consultation-completed')
})

router.post('/contacted-do-next-page', function (req, res) {
  const contactedDo = req.session.data['contactedDo']
  res.redirect(contactedDo === 'no' ? '/contact-do-warning' : '/consultation-completed')
})

// --- Consultation ---
router.post('/consultation-completed-next-page', function (req, res) {
  const consultationCompleted = req.session.data['consultationCompleted']
  if (!consultationCompleted) {
    return res.render('consultation-completed', { errors: true })
  }
  res.redirect(consultationCompleted === 'no' ? '/consultation-not-started' : '/consultation-dates')
})

router.post('/consultation-dates-submit', function (req, res) {
  res.redirect('/trust-name')
})

// --- Trust & academy details ---
const trusts = [
  { name: 'Delta Academies Trust', companiesHouseNumber: '07386086' },
  { name: 'REAch2 Academy Trust', companiesHouseNumber: '08452281' },
  { name: 'The Rutland Learning Trust', companiesHouseNumber: '09199785' },
  { name: 'United Learning Trust', companiesHouseNumber: '04439859' }
]

router.get('/trust-name', function (req, res) {
  res.render('trust-name', { trusts })
})

router.post('/trust-name-submit', function (req, res) {
  const name = (req.session.data['trustName'] || '').trim()
  if (!name) {
    return res.render('trust-name', { errors: true, trusts })
  }
  const match = trusts.find(t => t.name.toLowerCase() === name.toLowerCase())
  if (!match) {
    return res.render('trust-name', { errors: true, trusts })
  }
  req.session.data['trustName'] = match.name
  req.session.data['companiesHouseNumber'] = match.companiesHouseNumber
  res.redirect('/confirm-trust')
})

router.post('/confirm-trust-submit', function (req, res) {
  const answer = req.session.data['confirmTrust']
  if (!answer) {
    return res.render('confirm-trust', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/academy-name' : '/trust-name')
})


router.post('/academy-name-submit', function (req, res) {
  res.redirect('/academy-urn')
})

router.post('/academy-urn-submit', function (req, res) {
  res.redirect('/local-authority')
})

router.post('/local-authority-submit', function (req, res) {
  res.redirect('/your-role')
})

router.post('/your-role-submit', function (req, res) {
  if (!req.session.data['yourRole']) {
    return res.render('your-role', { errors: true })
  }
  res.redirect('/full-name')
})

router.post('/full-name-submit', function (req, res) {
  res.redirect('/email-addresses')
})

router.post('/email-addresses-submit', function (req, res) {
  if (!req.session.data['yourEmail']) {
    return res.render('email-addresses', { errors: true })
  }
  res.redirect('/phone-number')
})

router.post('/phone-number-submit', function (req, res) {
  res.redirect('/academy-type')
})

router.post('/academy-type-submit', function (req, res) {
  if (!req.session.data['academyType']) {
    return res.render('academy-type', { errors: true })
  }
  res.redirect('/which-change')
})

router.post('/which-change-submit', function (req, res) {
  if (!req.session.data['whichChange']) {
    return res.render('which-change', { errors: true })
  }
  res.redirect(req.session.data['whichChange'] === 'boarding' ? '/what-do-you-plan-to-do' : '/about-significant-change')
})

router.post('/what-do-you-plan-to-do-submit', function (req, res) {
  if (!req.session.data['whatDoYouPlanToDo']) {
    return res.render('what-do-you-plan-to-do', { errors: true })
  }
  res.redirect('/about-significant-change')
})

router.post('/about-significant-change-submit', function (req, res) {
  if (!req.session.data['reason']) {
    return res.render('about-significant-change', { errors: true })
  }
  res.redirect(req.session.data['whatDoYouPlanToDo'] === 'add' ? '/boarding-further-details' : '/sen-impact')
})

router.post('/boarding-further-details-submit', function (req, res) {
  res.redirect('/sen-impact')
})

router.post('/sen-impact-next', function (req, res) {
  const answer = req.session.data['senImpact']
  if (!answer) {
    return res.render('sen-impact', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/sen-further-details' : '/effective-date')
})

router.post('/sen-further-details-submit', function (req, res) {
  res.redirect('/effective-date')
})

router.post('/effective-date-next', function (req, res) {
  if (!req.session.data['effective-date-day']) {
    return res.render('effective-date', { errors: true })
  }
  const consultationCompleted = req.session.data['consultationCompleted']
  res.redirect(consultationCompleted === 'yes' ? '/consultation-summary' : '/local-authority-objections')
})

router.post('/consultation-summary-submit', function (req, res) {
  if (!req.session.data['consultationSummary']) {
    return res.render('consultation-summary', { errors: true })
  }
  res.redirect('/consultation-evidence')
})

router.post('/consultation-evidence-submit', function (req, res) {
  res.redirect('/local-authority-objections')
})

router.post('/local-authority-objections-next', function (req, res) {
  const answer = req.session.data['laObjections']
  if (!answer) {
    return res.render('local-authority-objections', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/objections-details' : '/objections-evidence')
})

router.post('/objections-details-submit', function (req, res) {
  if (!req.session.data['objectionsDetails']) {
    return res.render('objections-details', { errors: true })
  }
  res.redirect('/objections-evidence')
})

router.post('/objections-evidence-submit', function (req, res) {
  res.redirect('/funding-required')
})

router.post('/funding-required-next', function (req, res) {
  const answer = req.session.data['fundingRequired']
  if (!answer) {
    return res.render('funding-required', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/funding-secured' : '/religious-consent-required')
})

router.post('/funding-secured-submit', function (req, res) {
  if (!req.session.data['fundingSecured']) {
    return res.render('funding-secured', { errors: true })
  }
  res.redirect('/funding-details')
})

router.post('/funding-details-submit', function (req, res) {
  if (!req.session.data['fundingDetails']) {
    return res.render('funding-details', { errors: true })
  }
  res.redirect('/religious-consent-required')
})

router.post('/religious-consent-required-next', function (req, res) {
  const answer = req.session.data['religiousConsentRequired']
  if (!answer) {
    return res.render('religious-consent-required', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/religious-consent-secured' : '/planning-required')
})

router.post('/religious-consent-secured-next', function (req, res) {
  const answer = req.session.data['religiousConsentSecured']
  if (!answer) {
    return res.render('religious-consent-secured', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/religious-consent-evidence' : '/religious-consent-explain')
})

router.post('/religious-consent-evidence-submit', function (req, res) {
  res.redirect('/planning-required')
})

router.post('/religious-consent-explain-submit', function (req, res) {
  if (!req.session.data['religiousConsentExplain']) {
    return res.render('religious-consent-explain', { errors: true })
  }
  res.redirect('/planning-required')
})

router.post('/planning-required-next', function (req, res) {
  const answer = req.session.data['planningRequired']
  if (!answer) {
    return res.render('planning-required', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/planning-obtained' : '/admissions-variation')
})

router.post('/planning-obtained-next', function (req, res) {
  const answer = req.session.data['planningObtained']
  if (!answer) {
    return res.render('planning-obtained', { errors: true })
  }
  res.redirect(answer === 'no' ? '/planning-explain' : '/land-transaction')
})

router.post('/planning-explain-submit', function (req, res) {
  if (!req.session.data['planningExplain']) {
    return res.render('planning-explain', { errors: true })
  }
  res.redirect('/land-transaction')
})

router.post('/land-transaction-next', function (req, res) {
  const answer = req.session.data['landTransaction']
  if (!answer) {
    return res.render('land-transaction', { errors: true })
  }
  res.redirect(answer === 'no' ? '/land-transaction-explain' : '/admissions-variation')
})

router.post('/land-transaction-explain-submit', function (req, res) {
  if (!req.session.data['landTransactionExplain']) {
    return res.render('land-transaction-explain', { errors: true })
  }
  res.redirect('/admissions-variation')
})

router.post('/admissions-variation-submit', function (req, res) {
  if (!req.session.data['admissionsVariation']) {
    return res.render('admissions-variation', { errors: true })
  }
  res.redirect('/ofsted-inspection')
})

router.post('/ofsted-inspection-next', function (req, res) {
  const answer = req.session.data['ofstedInspection']
  if (!answer) {
    return res.render('ofsted-inspection', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/ofsted-outcome' : '/intervention-eligible')
})

router.post('/ofsted-outcome-submit', function (req, res) {
  res.redirect('/intervention-eligible')
})

router.post('/intervention-eligible-next', function (req, res) {
  const answer = req.session.data['interventionEligible']
  if (!answer) {
    return res.render('intervention-eligible', { errors: true })
  }
  res.redirect(answer === 'yes' ? '/intervention-explain' : '/equality-duty')
})

router.post('/intervention-explain-submit', function (req, res) {
  if (!req.session.data['interventionExplain']) {
    return res.render('intervention-explain', { errors: true })
  }
  res.redirect('/independent-school-standards')
})

router.post('/independent-school-standards-next', function (req, res) {
  const answer = req.session.data['independentSchoolStandards']
  if (!answer) {
    return res.render('independent-school-standards', { errors: true })
  }
  res.redirect(answer === 'no' ? '/independent-school-standards-explain' : '/fire-safety-compliance')
})

router.post('/independent-school-standards-explain-submit', function (req, res) {
  if (!req.session.data['issExplain']) {
    return res.render('independent-school-standards-explain', { errors: true })
  }
  res.redirect('/fire-safety-compliance')
})

router.post('/fire-safety-compliance-next', function (req, res) {
  const answer = req.session.data['fireSafety']
  if (!answer) {
    return res.render('fire-safety-compliance', { errors: true })
  }
  res.redirect(answer === 'no' ? '/fire-safety-explain' : '/equality-duty')
})

router.post('/fire-safety-explain-submit', function (req, res) {
  if (!req.session.data['fireSafetyExplain']) {
    return res.render('fire-safety-explain', { errors: true })
  }
  res.redirect('/equality-duty')
})

router.post('/equality-duty-next', function (req, res) {
  const answer = req.session.data['equalityDuty']
  if (!answer) {
    return res.render('equality-duty', { errors: true })
  }
  res.redirect(answer === 'likely' ? '/equality-duty-mitigate' : '/check-answers')
})

router.post('/equality-duty-mitigate-submit', function (req, res) {
  if (!req.session.data['equalityDutyMitigate']) {
    return res.render('equality-duty-mitigate', { errors: true })
  }
  res.redirect('/check-answers')
})

router.post('/confirmation', function (req, res) {
  req.session.data['applicationReference'] = 'TSC-2026-0142'
  res.render('confirmation')
})

// ============================================================
// V3 – task list version (views in app/views/v3/)
// ============================================================

const v3Trusts = [
  { name: 'Delta Academies Trust', companiesHouseNumber: '07386086' },
  { name: 'REAch2 Academy Trust', companiesHouseNumber: '08452281' },
  { name: 'The Rutland Learning Trust', companiesHouseNumber: '09199785' },
  { name: 'United Learning Trust', companiesHouseNumber: '04439859' }
]
const v3Academies = [
  { name: 'Ernest Bevin Academy', urn: '149543', localAuthority: 'Wandsworth' },
  { name: 'Marlborough Road Academy', urn: '146792', localAuthority: 'Salford' },
  { name: 'The Hurlingham Academy', urn: '141617', localAuthority: 'Hammersmith and Fulham' }
]

const V3_SECTIONS = [
  { id: 'check', title: 'Check before you start', items: [['consultation-status', 'Consultation status', 'has-change-been-made'], ['change-type', 'Type of significant change', 'which-change']] },
  { id: 'trust-academy', title: 'Trust and academy', items: [['trust', 'Trust details', 'trust-name'], ['academy', 'Academy details', 'academy-name'], ['contact', 'Contact details', 'your-role']] },
  { id: 'change', title: 'Significant change', items: [['change-details', 'About the significant change', 'about-significant-change'], ['governance', 'Governance and leadership', 'boarding-further-details'], ['sen-impact', 'Impact on SEN provision', 'sen-impact'], ['additional-details', 'Additional details', 'additional-details-start'], ['sen-provision', 'SEN provision', 'sen-provision'], ['effective-date', 'Effective date of the change', 'effective-date']] },
  { id: 'consultation', title: 'Consultation', items: [['consultation-dates', 'Consultation dates', 'consultation-dates'], ['consultation-summary', 'Consultation summary', 'consultation-summary'], ['consultation-evidence', 'Consultation evidence', 'consultation-evidence']] },
  { id: 'funding', title: 'Funding', items: [['funding', 'Funding details', 'funding-required']] },
  { id: 'consent', title: 'Consent and permissions', items: [['la-objections', 'Local authority objections', 'local-authority-objections'], ['religious-consent', 'Consent from religious bodies', 'religious-consent-required']] },
  { id: 'planning', title: 'Land and planning permission', items: [['planning', 'Planning permission', 'planning-required'], ['land-transaction', 'Land transaction proposal', 'land-transaction']] },
  { id: 'admissions', title: 'Admissions variation', items: [['admissions', 'Admissions variation details', 'admissions-variation']] },
  { id: 'ofsted', title: 'Ofsted and performance', items: [['intervention', 'Intervention measures', 'intervention-eligible']] },
  { id: 'psed', title: 'Public Sector Equality Duty Statement', items: [['psed', 'Public Sector Equality Duty Statement', 'equality-duty']] }
]

function v3AgeRangePlans (data) {
  const p = data['planAgeRange'] || []
  return Array.isArray(p) ? p : [p]
}

function v3Hidden (id, data) {
  const type = data['whichChange']
  const plans = v3AgeRangePlans(data)
  const mainstreamPlaces = ['add-mainstream', 'remove-mainstream'].includes(data['planPupilPlaces'])
  if (id === 'governance') return !((type === 'boarding' && data['whatDoYouPlanToDo'] === 'add') || type === 'gender' || type === 'sen-type')
  if (id === 'sen-impact') return ['age-range', 'gender', 'sen-type', 'pupil-places'].includes(type)
  if (id === 'additional-details') {
    if (type === 'age-range') return !(plans.includes('add-sixth-form') || plans.includes('remove-sixth-form'))
    if (type === 'gender') return false
    if (type === 'pupil-places') return !mainstreamPlaces
    return true
  }
  if (id === 'sen-provision') return !(type === 'sen-type' || (type === 'pupil-places' && !mainstreamPlaces))
  return false
}

function v3Done (req, res, task) {
  req.session.data['v3-task-' + task] = 'completed'
  res.redirect('/v3/task-list')
}

router.get('/v3/task-list', function (req, res) {
  const data = req.session.data
  const consultationDone = data['v3-task-consultation-status'] === 'completed'
  const sections = V3_SECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    items: section.items.filter(([id]) => !v3Hidden(id, data)).map(([id, title, first]) => {
      const completed = data['v3-task-' + id] === 'completed'
      let locked = section.id !== 'check' && !consultationDone
      if (['change-details', 'governance', 'sen-impact', 'additional-details', 'sen-provision'].includes(id) && data['v3-task-change-type'] !== 'completed') locked = true
      if ((id === 'consultation-summary' || id === 'consultation-evidence') && data['consultationCompleted'] !== 'yes') locked = true
      let status
      if (completed) status = { text: 'Completed' }
      else if (locked) status = { text: 'Cannot start yet', classes: 'govuk-task-list__status--cannot-start-yet' }
      else status = { tag: { text: 'Not yet started', classes: 'govuk-tag--blue' } }
      return { title: { text: title }, href: locked ? undefined : '/v3/' + first, status, locked, completed }
    })
  }))
  sections.push({
    id: 'submit',
    title: 'Submit',
    items: [{
      title: { text: 'Check answers and submit' },
      href: '/v3/check-answers',
      status: { tag: { text: 'Not yet started', classes: 'govuk-tag--blue' } }
    }]
  })
  res.render('v3/task-list', { sections })
})

// --- Consultation status ---
router.post('/v3/has-change-been-made-submit', function (req, res) {
  const answer = req.session.data['hasChangeBeenMade']
  if (!answer) return res.render('v3/has-change-been-made', { errors: true })
  res.redirect(answer === 'yes' ? '/v3/contacted-do' : '/v3/consultation-completed')
})

router.post('/v3/contacted-do-next-page', function (req, res) {
  res.redirect(req.session.data['contactedDo'] === 'no' ? '/v3/contact-do-warning' : '/v3/consultation-completed')
})

router.post('/v3/consultation-completed-next-page', function (req, res) {
  const answer = req.session.data['consultationCompleted']
  if (!answer) return res.render('v3/consultation-completed', { errors: true })
  if (answer === 'no') return res.redirect('/v3/consultation-not-started')
  req.session.data['v3-task-consultation-status'] = 'completed'
  res.redirect('/v3/which-change')
})

// --- Trust ---
router.get('/v3/trust-name', function (req, res) {
  res.render('v3/trust-name', { trusts: v3Trusts })
})

router.post('/v3/trust-name-submit', function (req, res) {
  const name = (req.session.data['trustName'] || '').trim().toLowerCase()
  const match = v3Trusts.find(t => t.name.toLowerCase() === name)
  if (!match) return res.render('v3/trust-name', { errors: true, trusts: v3Trusts })
  req.session.data['trustName'] = match.name
  req.session.data['companiesHouseNumber'] = match.companiesHouseNumber
  res.redirect('/v3/confirm-trust')
})

router.post('/v3/confirm-trust-submit', function (req, res) {
  const answer = req.session.data['confirmTrust']
  if (!answer) return res.render('v3/confirm-trust', { errors: true })
  if (answer === 'no') return res.redirect('/v3/trust-name')
  v3Done(req, res, 'trust')
})

// --- Academy ---
router.get('/v3/academy-name', function (req, res) {
  res.render('v3/academy-name', { academies: v3Academies })
})

router.post('/v3/academy-name-submit', function (req, res) {
  const name = (req.session.data['academyName'] || '').trim().toLowerCase()
  const match = v3Academies.find(a => a.name.toLowerCase() === name)
  if (!match) return res.render('v3/academy-name', { errors: true, academies: v3Academies })
  req.session.data['academyName'] = match.name
  req.session.data['academyUrn'] = match.urn
  req.session.data['localAuthority'] = match.localAuthority
  res.redirect('/v3/confirm-academy')
})

router.post('/v3/confirm-academy-submit', function (req, res) {
  const answer = req.session.data['confirmAcademy']
  if (!answer) return res.render('v3/confirm-academy', { errors: true })
  if (answer === 'no') return res.redirect('/v3/academy-name')
  v3Done(req, res, 'academy')
})

// --- Contact details ---
router.post('/v3/your-role-submit', function (req, res) {
  if (!req.session.data['yourRole']) return res.render('v3/your-role', { errors: true })
  res.redirect('/v3/full-name')
})

router.post('/v3/full-name-submit', function (req, res) {
  res.redirect('/v3/email-addresses')
})

router.post('/v3/email-addresses-submit', function (req, res) {
  if (!req.session.data['yourEmail']) return res.render('v3/email-addresses', { errors: true })
  res.redirect('/v3/phone-number')
})

router.post('/v3/phone-number-submit', function (req, res) {
  v3Done(req, res, 'contact')
})

// --- Type of significant change ---
const V3_PLAN_PAGES = {
  'boarding': ['what-do-you-plan-to-do', 'whatDoYouPlanToDo'],
  'satellite': ['plan-satellite', 'planSatellite'],
  'sen-unit': ['plan-sen-unit', 'planSenUnit'],
  'age-range': ['plan-age-range', 'planAgeRange'],
  'gender': ['plan-gender', 'planGender'],
  'pupil-places': ['plan-pupil-places', 'planPupilPlaces']
}

router.post('/v3/which-change-submit', function (req, res) {
  const type = req.session.data['whichChange']
  if (!type) return res.render('v3/which-change', { errors: true })
  if (V3_PLAN_PAGES[type]) return res.redirect('/v3/' + V3_PLAN_PAGES[type][0])
  v3Done(req, res, 'change-type')
})

Object.values(V3_PLAN_PAGES).forEach(function ([page, field]) {
  router.post('/v3/' + page + '-submit', function (req, res) {
    const answer = req.session.data[field]
    if (!answer || (Array.isArray(answer) && !answer.filter(Boolean).length)) return res.render('v3/' + page, { errors: true })
    v3Done(req, res, 'change-type')
  })
})

// --- Details of the significant change ---
// Additional details (change of age range – sixth form)
router.get('/v3/additional-details-start', function (req, res) {
  const type = req.session.data['whichChange']
  if (type === 'gender') return res.redirect('/v3/pupil-equity')
  if (type === 'pupil-places') return res.redirect('/v3/capacity')
  const plans = v3AgeRangePlans(req.session.data)
  res.redirect(plans.includes('add-sixth-form') ? '/v3/adding-sixth-form' : '/v3/removing-sixth-form')
})

router.post('/v3/adding-sixth-form-submit', function (req, res) {
  res.redirect('/v3/sixth-form-pan')
})

router.post('/v3/sixth-form-pan-submit', function (req, res) {
  if (!req.session.data['sixthFormPan']) return res.render('v3/sixth-form-pan', { errors: true })
  if (v3AgeRangePlans(req.session.data).includes('remove-sixth-form')) return res.redirect('/v3/removing-sixth-form')
  v3Done(req, res, 'additional-details')
})

router.post('/v3/pupil-equity-submit', function (req, res) {
  v3Done(req, res, 'additional-details')
})

router.post('/v3/capacity-submit', function (req, res) {
  v3Done(req, res, 'additional-details')
})

router.post('/v3/sen-provision-submit', function (req, res) {
  v3Done(req, res, 'sen-provision')
})

router.post('/v3/removing-sixth-form-submit', function (req, res) {
  v3Done(req, res, 'additional-details')
})

router.post('/v3/about-significant-change-submit', function (req, res) {
  if (!req.session.data['reason']) return res.render('v3/about-significant-change', { errors: true })
  v3Done(req, res, 'change-details')
})

router.post('/v3/boarding-further-details-submit', function (req, res) {
  v3Done(req, res, 'governance')
})

router.post('/v3/sen-impact-next', function (req, res) {
  const answer = req.session.data['senImpact']
  if (!answer) return res.render('v3/sen-impact', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'sen-impact')
  res.redirect('/v3/sen-further-details')
})

router.post('/v3/sen-further-details-submit', function (req, res) {
  v3Done(req, res, 'sen-impact')
})

router.post('/v3/significant-change-check-submit', function (req, res) {
  v3Done(req, res, 'change-details')
})

// --- Effective date ---
router.post('/v3/effective-date-next', function (req, res) {
  if (!req.session.data['effective-date-day']) return res.render('v3/effective-date', { errors: true })
  v3Done(req, res, 'effective-date')
})

// --- Consultation ---
router.post('/v3/consultation-dates-submit', function (req, res) {
  v3Done(req, res, 'consultation-dates')
})

router.post('/v3/consultation-summary-submit', function (req, res) {
  if (!req.session.data['consultationSummary']) return res.render('v3/consultation-summary', { errors: true })
  v3Done(req, res, 'consultation-summary')
})

router.post('/v3/consultation-evidence-submit', function (req, res) {
  v3Done(req, res, 'consultation-evidence')
})

// --- Funding ---
router.post('/v3/funding-required-next', function (req, res) {
  const answer = req.session.data['fundingRequired']
  if (!answer) return res.render('v3/funding-required', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'funding')
  res.redirect('/v3/funding-secured')
})

router.post('/v3/funding-secured-submit', function (req, res) {
  if (!req.session.data['fundingSecured']) return res.render('v3/funding-secured', { errors: true })
  res.redirect('/v3/funding-details')
})

router.post('/v3/funding-details-submit', function (req, res) {
  if (!req.session.data['fundingDetails']) return res.render('v3/funding-details', { errors: true })
  v3Done(req, res, 'funding')
})

// --- Local authority objections ---
router.post('/v3/local-authority-objections-next', function (req, res) {
  const answer = req.session.data['laObjections']
  if (!answer) return res.render('v3/local-authority-objections', { errors: true })
  res.redirect(answer === 'yes' ? '/v3/objections-details' : '/v3/objections-evidence')
})

router.post('/v3/objections-details-submit', function (req, res) {
  if (!req.session.data['objectionsDetails']) return res.render('v3/objections-details', { errors: true })
  v3Done(req, res, 'la-objections')
})

router.post('/v3/objections-evidence-submit', function (req, res) {
  v3Done(req, res, 'la-objections')
})

// --- Consent from religious bodies ---
router.post('/v3/religious-consent-required-next', function (req, res) {
  const answer = req.session.data['religiousConsentRequired']
  if (!answer) return res.render('v3/religious-consent-required', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'religious-consent')
  res.redirect('/v3/religious-consent-secured')
})

router.post('/v3/religious-consent-secured-next', function (req, res) {
  const answer = req.session.data['religiousConsentSecured']
  if (!answer) return res.render('v3/religious-consent-secured', { errors: true })
  res.redirect(answer === 'yes' ? '/v3/religious-consent-evidence' : '/v3/religious-consent-explain')
})

router.post('/v3/religious-consent-evidence-submit', function (req, res) {
  v3Done(req, res, 'religious-consent')
})

router.post('/v3/religious-consent-explain-submit', function (req, res) {
  if (!req.session.data['religiousConsentExplain']) return res.render('v3/religious-consent-explain', { errors: true })
  v3Done(req, res, 'religious-consent')
})

// --- Planning permission ---
router.post('/v3/planning-required-next', function (req, res) {
  const answer = req.session.data['planningRequired']
  if (!answer) return res.render('v3/planning-required', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'planning')
  res.redirect('/v3/planning-obtained')
})

router.post('/v3/planning-obtained-next', function (req, res) {
  const answer = req.session.data['planningObtained']
  if (!answer) return res.render('v3/planning-obtained', { errors: true })
  if (answer === 'no') return res.redirect('/v3/planning-explain')
  v3Done(req, res, 'planning')
})

router.post('/v3/planning-explain-submit', function (req, res) {
  if (!req.session.data['planningExplain']) return res.render('v3/planning-explain', { errors: true })
  v3Done(req, res, 'planning')
})

// --- Land transaction ---
router.post('/v3/land-transaction-next', function (req, res) {
  const answer = req.session.data['landTransaction']
  if (!answer) return res.render('v3/land-transaction', { errors: true })
  if (answer === 'no') return res.redirect('/v3/land-transaction-explain')
  v3Done(req, res, 'land-transaction')
})

router.post('/v3/land-transaction-explain-submit', function (req, res) {
  if (!req.session.data['landTransactionExplain']) return res.render('v3/land-transaction-explain', { errors: true })
  v3Done(req, res, 'land-transaction')
})

// --- Admissions variation ---
router.post('/v3/admissions-variation-submit', function (req, res) {
  const answer = req.session.data['admissionsVariation']
  if (!answer) return res.render('v3/admissions-variation', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'admissions')
  res.redirect('/v3/admissions-changes')
})

router.post('/v3/admissions-changes-submit', function (req, res) {
  if (!req.session.data['admissionsChanges']) return res.render('v3/admissions-changes', { errors: true })
  res.redirect('/v3/admissions-draft')
})

router.post('/v3/admissions-draft-submit', function (req, res) {
  v3Done(req, res, 'admissions')
})

// --- Ofsted ---
router.post('/v3/ofsted-inspection-next', function (req, res) {
  const answer = req.session.data['ofstedInspection']
  if (!answer) return res.render('v3/ofsted-inspection', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'ofsted')
  res.redirect('/v3/ofsted-outcome')
})

router.post('/v3/ofsted-outcome-submit', function (req, res) {
  v3Done(req, res, 'ofsted')
})

// --- Intervention measures ---
router.post('/v3/intervention-eligible-next', function (req, res) {
  const answer = req.session.data['interventionEligible']
  if (!answer) return res.render('v3/intervention-eligible', { errors: true })
  if (answer === 'no') return v3Done(req, res, 'intervention')
  res.redirect('/v3/intervention-explain')
})

router.post('/v3/intervention-explain-submit', function (req, res) {
  if (!req.session.data['interventionExplain']) return res.render('v3/intervention-explain', { errors: true })
  res.redirect('/v3/independent-school-standards')
})

router.post('/v3/independent-school-standards-next', function (req, res) {
  const answer = req.session.data['independentSchoolStandards']
  if (!answer) return res.render('v3/independent-school-standards', { errors: true })
  res.redirect(answer === 'no' ? '/v3/independent-school-standards-explain' : '/v3/fire-safety-compliance')
})

router.post('/v3/independent-school-standards-explain-submit', function (req, res) {
  if (!req.session.data['issExplain']) return res.render('v3/independent-school-standards-explain', { errors: true })
  res.redirect('/v3/fire-safety-compliance')
})

router.post('/v3/fire-safety-compliance-next', function (req, res) {
  const answer = req.session.data['fireSafety']
  if (!answer) return res.render('v3/fire-safety-compliance', { errors: true })
  if (answer === 'no') return res.redirect('/v3/fire-safety-explain')
  v3Done(req, res, 'intervention')
})

router.post('/v3/fire-safety-explain-submit', function (req, res) {
  if (!req.session.data['fireSafetyExplain']) return res.render('v3/fire-safety-explain', { errors: true })
  v3Done(req, res, 'intervention')
})

// --- Public Sector Equality Duty ---
router.post('/v3/equality-duty-next', function (req, res) {
  const answer = req.session.data['equalityDuty']
  if (!answer) return res.render('v3/equality-duty', { errors: true })
  if (answer === 'likely') return res.redirect('/v3/equality-duty-mitigate')
  v3Done(req, res, 'psed')
})

router.post('/v3/equality-duty-mitigate-submit', function (req, res) {
  if (!req.session.data['equalityDutyMitigate']) return res.render('v3/equality-duty-mitigate', { errors: true })
  v3Done(req, res, 'psed')
})

// --- Submit ---
function v3AllComplete (data) {
  const consultationDone = data['v3-task-consultation-status'] === 'completed'
  return V3_SECTIONS.every(section => section.items.every(([id]) => {
    if (data['v3-task-' + id] === 'completed' || v3Hidden(id, data)) return true
    const notNeeded = (id === 'consultation-summary' || id === 'consultation-evidence') && consultationDone && data['consultationCompleted'] !== 'yes'
    return notNeeded
  }))
}

const V3_LABELS = {
  whichChange: { 'boarding': 'Add or remove a boarding provision', 'satellite': 'Add or remove a satellite site or move the academy to another site', 'sen-unit': 'Add or remove a SEN unit or resourced provision', 'age-range': 'Change age range', 'gender': 'Change from single sex to co-educational or co-educational to single sex', 'sen-type': 'Change the type of SEN provision', 'pupil-places': 'Increase or decrease existing mainstream or SEN pupil places' },
  plans: { 'add': 'Add', 'remove': 'Remove', 'transfer': 'Transfer the academy to another site', 'add-resourced': 'Add a new resourced provision', 'add-sen-unit': 'Add a new SEN unit', 'add-sixth-form': 'Add a sixth form', 'remove-sixth-form': 'Remove a sixth form', 'remove-nursery': 'Remove a nursery', 'all-through': 'Change of age range to create an all through school', 'to-co-ed': 'Change from single sex to co-educational', 'to-single-sex': 'Change from co-educational to single sex', 'add-mainstream': 'Expand capacity by adding 31 or more mainstream pupil places', 'remove-mainstream': 'Reduce capacity by removing 31 or more mainstream pupil places', 'add-ap-special': 'Expand capacity by adding pupil places in an AP or special academy', 'remove-ap-special': 'Reduce capacity by removing pupil places in an AP or special academy', 'add-sen': 'Add pupil places to an existing SEN unit or resourced provision', 'remove-sen': 'Remove pupil places from an existing SEN unit or resourced provision' }
}

function v3ChangeRows (data) {
  const rows = []
  const row = (key, value, href) => rows.push({ key: { text: key }, value: { text: value || 'Not answered' }, actions: { items: [{ href: href, text: 'Change', visuallyHiddenText: key.toLowerCase() }] } })
  const yesNo = v => ({ yes: 'Yes', no: 'No' })[v] || v
  const type = data['whichChange']
  row('Type of significant change', V3_LABELS.whichChange[type], '/v3/which-change')
  const planPage = V3_PLAN_PAGES[type]
  if (planPage) {
    let plan = data[planPage[1]]
    plan = (Array.isArray(plan) ? plan : [plan]).filter(p => p && p !== '_unchecked').map(p => V3_LABELS.plans[p] || p).join(', ')
    row('What do you plan to do?', plan, '/v3/' + planPage[0])
  }
  row('About the significant change', data['reason'], '/v3/about-significant-change')
  if (!v3Hidden('governance', data)) row('Governance and leadership', data['boardingGovernance'], '/v3/boarding-further-details')
  if (!v3Hidden('sen-impact', data)) {
    row('Will this change have an impact on SEN provision?', yesNo(data['senImpact']), '/v3/sen-impact')
    if (data['senImpact'] === 'yes') row('SEN provision', data['senAccess'], '/v3/sen-further-details')
  }
  if (!v3Hidden('additional-details', data)) {
    const plans = v3AgeRangePlans(data)
    if (type === 'age-range') {
      if (plans.includes('add-sixth-form')) {
        row('Adding a sixth form', data['addingSixthForm'], '/v3/adding-sixth-form')
        row('Opening a new sixth form without an external PAN', yesNo(data['sixthFormPan']), '/v3/sixth-form-pan')
      }
      if (plans.includes('remove-sixth-form')) row('Removing a sixth form', data['removingSixthForm'], '/v3/removing-sixth-form')
    }
    if (type === 'gender') row('Pupil equity considerations', data['pupilEquity'], '/v3/pupil-equity')
    if (type === 'pupil-places') row('Capacity', data['capacity'], '/v3/capacity')
  }
  if (!v3Hidden('sen-provision', data)) row('SEN provision', data['senProvision'], '/v3/sen-provision')
  const d = [data['effective-date-day'], data['effective-date-month'], data['effective-date-year']]
  row('Effective date of the change', d.every(Boolean) ? d.join('/') : '', '/v3/effective-date')
  return rows
}

router.get('/v3/check-answers', function (req, res) {
  res.render('v3/check-answers', { allComplete: v3AllComplete(req.session.data), changeRows: v3ChangeRows(req.session.data) })
})

router.post('/v3/confirmation', function (req, res) {
  if (!v3AllComplete(req.session.data)) return res.redirect('/v3/check-answers')
  req.session.data['applicationReference'] = 'TSC-2026-0142'
  res.render('v3/confirmation')
})

// ============================================================
// V4 – task list version built from the Figma "V3 working file"
// (views in app/views/v4/, significant change pages in app/views/v4/change/)
// Task status is stored in session as v4-task-<id> = 'in-progress' | 'completed'
// ============================================================

const V4_CHANGE_PAGES = require('./data/v4-change-pages.json')

const V4_SECTIONS = [
  { id: 'check', title: 'Check before you start', items: [['consultation-status', 'Consultation status', 'has-change-been-made']] },
  { id: 'trust-academy', title: 'Trust and academy', items: [['trust', 'Trust details', 'trust-name'], ['academy', 'Academy details', 'academy-name'], ['contact', 'Contact details', 'your-role']] },
  { id: 'change', title: 'Significant change details', items: [['change-details', 'About the significant change', 'change/which-change'], ['effective-date', 'Effective date of the change', 'effective-date']] },
  { id: 'consultation', title: 'Consultation', items: [['consultation-dates', 'Consultation dates', 'consultation-dates'], ['consultation-summary', 'Consultation summary', 'consultation-summary'], ['consultation-evidence', 'Consultation evidence', 'consultation-evidence']] },
  { id: 'funding', title: 'Funding', items: [['funding', 'Funding details', 'funding-required']] },
  { id: 'consent', title: 'Consent and permissions', items: [['la-objections', 'Local authority objections', 'local-authority-objections'], ['religious-consent', 'Consent from religious bodies', 'religious-consent-required'], ['planning', 'Planning permission', 'planning-required'], ['land-transaction', 'Land transaction proposal', 'land-transaction-required']] },
  { id: 'admissions', title: 'Admissions variation', items: [['admissions', 'Admissions variation details', 'admissions-variation']] },
  { id: 'performance', title: 'Academy performance', items: [['ofsted', 'Ofsted', 'ofsted-inspection'], ['intervention', 'Intervention measures', 'intervention-eligible']] },
  { id: 'psed', title: 'Public Sector Equality Duty Statement', items: [['psed', 'Public Sector Equality Duty Statement', 'equality-duty']] }
]

// Which task each page belongs to, so a task shows as "Incomplete" once someone has started it
const V4_PAGE_TASKS = [
  [/^(has-change-been-made|contacted-do|consultation-completed)/, 'consultation-status'],
  [/^(trust-name|confirm-trust)/, 'trust'],
  [/^(academy-name|confirm-academy)/, 'academy'],
  [/^(your-role|full-name|email-addresses|phone-number)/, 'contact'],
  [/^change\//, 'change-details'],
  [/^effective-date/, 'effective-date'],
  [/^consultation-dates/, 'consultation-dates'],
  [/^consultation-summary/, 'consultation-summary'],
  [/^consultation-evidence/, 'consultation-evidence'],
  [/^funding-/, 'funding'],
  [/^(local-authority-objections|objections-)/, 'la-objections'],
  [/^religious-consent-/, 'religious-consent'],
  [/^planning-/, 'planning'],
  [/^land-transaction/, 'land-transaction'],
  [/^admissions-/, 'admissions'],
  [/^ofsted-/, 'ofsted'],
  [/^(intervention-|independent-school-standards|fire-safety-)/, 'intervention'],
  [/^equality-duty/, 'psed']
]

function v4Task (data, id) {
  return data['v4-task-' + id]
}

function v4Done (req, res, task) {
  req.session.data['v4-task-' + task] = 'completed'
  res.redirect('/v4/task-list')
}

// Mark a task as started when any of its pages is submitted
router.post(/^\/v4\/.+/, function (req, res, next) {
  const page = req.path.replace(/^\/v4\//, '')
  const match = V4_PAGE_TASKS.find(([pattern]) => pattern.test(page))
  if (match && v4Task(req.session.data, match[1]) !== 'completed') req.session.data['v4-task-' + match[1]] = 'in-progress'
  next()
})

router.get('/v4/task-list', function (req, res) {
  const data = req.session.data
  const sections = V4_SECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    items: section.items.map(([id, title, first]) => {
      const state = v4Task(data, id)
      let status
      if (state === 'completed') status = { text: 'Completed' }
      else if (state === 'in-progress') status = { tag: { text: 'Incomplete', classes: 'govuk-tag--light-blue' } }
      else status = { tag: { text: 'Not yet started', classes: 'govuk-tag--blue' } }
      return { title: { text: title }, href: '/v4/' + first, status }
    })
  }))
  res.render('v4/task-list', { sections, trustName: data['trustName'], academyName: data['academyName'] })
})

// --- Start, interruption page and DfE Sign-in (mock) ---
router.post('/v4/dfe-sign-in-submit', function (req, res) {
  res.redirect('/v4/task-list')
})

// --- Consultation status ---
router.post('/v4/has-change-been-made-submit', function (req, res) {
  const answer = req.session.data['hasChangeBeenMade']
  if (!answer) return res.render('v4/has-change-been-made', { errors: true })
  res.redirect(answer === 'yes' ? '/v4/contacted-do' : '/v4/consultation-completed')
})

router.post('/v4/contacted-do-next-page', function (req, res) {
  const answer = req.session.data['contactedDo']
  if (!answer) return res.render('v4/contacted-do', { errors: true })
  res.redirect(answer === 'no' ? '/v4/contact-do-warning' : '/v4/consultation-completed')
})

router.post('/v4/consultation-completed-next-page', function (req, res) {
  const answer = req.session.data['consultationCompleted']
  if (!answer) return res.render('v4/consultation-completed', { errors: true })
  // If the change has already been made and they've told their DO, they can carry on without a consultation
  const toldDo = req.session.data['hasChangeBeenMade'] === 'yes' && req.session.data['contactedDo'] === 'yes'
  if (answer === 'no' && !toldDo) return res.redirect('/v4/consultation-not-started')
  v4Done(req, res, 'consultation-status')
})

// --- Trust ---
router.get('/v4/trust-name', function (req, res) {
  res.render('v4/trust-name', { trusts: v3Trusts })
})

router.post('/v4/trust-name-submit', function (req, res) {
  const name = (req.session.data['trustName'] || '').trim().toLowerCase()
  const match = v3Trusts.find(t => t.name.toLowerCase() === name)
  if (!match) return res.render('v4/trust-name', { errors: true, trusts: v3Trusts })
  req.session.data['trustName'] = match.name
  req.session.data['companiesHouseNumber'] = match.companiesHouseNumber
  res.redirect('/v4/confirm-trust')
})

router.post('/v4/confirm-trust-submit', function (req, res) {
  const answer = req.session.data['confirmTrust']
  if (!answer) return res.render('v4/confirm-trust', { errors: true })
  if (answer === 'no') return res.redirect('/v4/trust-name')
  v4Done(req, res, 'trust')
})

// --- Academy ---
router.get('/v4/academy-name', function (req, res) {
  res.render('v4/academy-name', { academies: v3Academies })
})

router.post('/v4/academy-name-submit', function (req, res) {
  const name = (req.session.data['academyName'] || '').trim().toLowerCase()
  const match = v3Academies.find(a => a.name.toLowerCase() === name)
  if (!match) return res.render('v4/academy-name', { errors: true, academies: v3Academies })
  req.session.data['academyName'] = match.name
  req.session.data['academyUrn'] = match.urn
  req.session.data['localAuthority'] = match.localAuthority
  res.redirect('/v4/confirm-academy')
})

router.post('/v4/confirm-academy-submit', function (req, res) {
  const answer = req.session.data['confirmAcademy']
  if (!answer) return res.render('v4/confirm-academy', { errors: true })
  if (answer === 'no') return res.redirect('/v4/academy-name')
  v4Done(req, res, 'academy')
})

// --- Contact details ---
function v4List (value) {
  return (Array.isArray(value) ? value : [value]).filter(v => v && v !== '_unchecked')
}

router.post('/v4/your-role-submit', function (req, res) {
  if (!v4List(req.session.data['yourRole']).length) return res.render('v4/your-role', { errors: true })
  res.redirect('/v4/full-name')
})

router.post('/v4/full-name-submit', function (req, res) {
  if (!req.session.data['fullName']) return res.render('v4/full-name', { errors: true })
  res.redirect('/v4/email-addresses')
})

router.post('/v4/email-addresses-submit', function (req, res) {
  if (!req.session.data['yourEmail']) return res.render('v4/email-addresses', { errors: true })
  res.redirect('/v4/phone-number')
})

router.post('/v4/phone-number-submit', function (req, res) {
  if (!req.session.data['phoneNumber']) return res.render('v4/phone-number', { errors: true })
  v4Done(req, res, 'contact')
})

// --- About the significant change ---
// The pages someone sees depend on the type of change, what they plan to do and some answers on the way.
// Edit this function to change the order or branching of the significant change pages.
const V4_PLAN_PAGES = {
  'boarding': ['plan-boarding', 'planBoarding'],
  'satellite': ['plan-satellite', 'planSatellite'],
  'specialist-base': ['plan-specialist-base', 'planSpecialistBase'],
  'age-range': ['plan-age-range', 'planAgeRange'],
  'gender': ['plan-gender', 'planGender'],
  'pupil-places': ['plan-pupil-places', 'planPupilPlaces']
}

function v4ChangePages (data) {
  const type = data['whichChange']
  const pages = ['which-change']
  if (!type) return pages
  if (V4_PLAN_PAGES[type]) pages.push(V4_PLAN_PAGES[type][0])
  pages.push('about-significant-change')
  const senProvisionIfImpact = () => {
    pages.push('sen-impact')
    if (data['senImpact'] === 'yes') pages.push('sen-provision')
  }

  if (type === 'boarding') {
    // Figma route 1. Adding: governance first. Then the SEN impact question, and SEN provision if there is an impact.
    if (data['planBoarding'] === 'add') pages.push('governance')
    senProvisionIfImpact()
  }

  if (type === 'satellite') {
    // Figma route 2
    senProvisionIfImpact()
    if (data['planSatellite'] === 'add') {
      pages.push('admission-curriculum', 'governance', 'physical-characteristics', 'special-school-satellite')
      if (data['specialSchoolSatellite'] === 'yes') pages.push('special-school-provision')
    }
  }

  if (type === 'specialist-base') {
    // Figma route 3
    pages.push('sen-provision')
    if (data['planSpecialistBase'] === 'add') {
      pages.push('governance', 'la-placements', 'curriculum-offer', 'parental-engagement', 'pupil-outcomes', 'integration', 'large-specialist-base')
    } else {
      pages.push('send-plan')
    }
  }

  if (type === 'age-range') {
    // Figma route 4
    const plans = v4List(data['planAgeRange'])
    if (plans.some(p => ['add-sixth-form', 'all-through', 'primary', 'infant-junior', 'other'].includes(p))) pages.push('governance')
    if (plans.includes('add-sixth-form')) pages.push('adding-sixth-form', 'sixth-form-pan')
    if (plans.includes('remove-sixth-form')) pages.push('removing-sixth-form')
    senProvisionIfImpact()
  }

  if (type === 'gender') pages.push('governance', 'pupil-equity') // Figma route 5

  if (type === 'sen-type') pages.push('governance', 'sen-provision') // Figma route 6

  if (type === 'pupil-places') {
    // Figma route 7
    if (['add-mainstream', 'remove-mainstream'].includes(data['planPupilPlaces'])) pages.push('capacity')
    else pages.push('sen-provision', 'send-plan')
  }

  return pages
}

function v4MissingAnswer (page, data) {
  const fields = V4_CHANGE_PAGES[page] || []
  return fields.find(f => {
    if (!f.required) return false
    if (Array.isArray(data[f.name])) return !v4List(data[f.name]).length
    return !(data[f.name] || '').toString().trim()
  })
}

router.get('/v4/change/:page', function (req, res, next) {
  const page = req.params.page
  if (!V4_CHANGE_PAGES[page]) return next()
  const pages = v4ChangePages(req.session.data)
  res.render('v4/change/' + page, { isLast: pages[pages.length - 1] === page && page !== 'which-change' })
})

router.post('/v4/change/:page', function (req, res, next) {
  const page = req.params.page
  const data = req.session.data
  if (!V4_CHANGE_PAGES[page]) return next()
  if (v4MissingAnswer(page, data)) {
    const pages = v4ChangePages(data)
    return res.render('v4/change/' + page, { errors: true, isLast: pages[pages.length - 1] === page })
  }
  // Changing the type of change or the plan means the later pages need answering again
  if (page === 'which-change' || page.startsWith('plan-')) data['v4-task-change-details'] = 'in-progress'
  const pages = v4ChangePages(data)
  const nextPage = pages[pages.indexOf(page) + 1]
  if (nextPage) return res.redirect('/v4/change/' + nextPage)
  v4Done(req, res, 'change-details')
})

// --- Effective date ---
router.post('/v4/effective-date-next', function (req, res) {
  const data = req.session.data
  const parts = ['day', 'month', 'year'].filter(p => !(data['effective-date-' + p] || '').trim())
  if (parts.length) {
    const dateErrors = parts.length === 3
      ? [{ text: 'Enter the effective date of the change', href: '#effective-date-day' }]
      : parts.map(p => ({ text: 'The effective date of the change must include a ' + p, href: '#effective-date-' + p }))
    return res.render('v4/effective-date', { errors: true, dateErrors, errorParts: parts })
  }
  v4Done(req, res, 'effective-date')
})

// --- Consultation (all optional: leave blank if the consultation has not started or finished) ---
router.post('/v4/consultation-dates-submit', function (req, res) {
  v4Done(req, res, 'consultation-dates')
})

router.post('/v4/consultation-summary-submit', function (req, res) {
  v4Done(req, res, 'consultation-summary')
})

router.post('/v4/consultation-evidence-submit', function (req, res) {
  v4Done(req, res, 'consultation-evidence')
})

// --- Funding ---
router.post('/v4/funding-required-next', function (req, res) {
  const answer = req.session.data['fundingRequired']
  if (!answer) return res.render('v4/funding-required', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'funding')
  res.redirect('/v4/funding-secured')
})

router.post('/v4/funding-secured-submit', function (req, res) {
  if (!req.session.data['fundingSecured']) return res.render('v4/funding-secured', { errors: true })
  res.redirect('/v4/funding-details')
})

router.post('/v4/funding-details-submit', function (req, res) {
  if (!req.session.data['fundingDetails']) return res.render('v4/funding-details', { errors: true })
  v4Done(req, res, 'funding')
})

// --- Local authority objections ---
router.post('/v4/local-authority-objections-next', function (req, res) {
  const answer = req.session.data['laObjections']
  if (!answer) return res.render('v4/local-authority-objections', { errors: true })
  res.redirect(answer === 'yes' ? '/v4/objections-details' : '/v4/objections-evidence')
})

router.post('/v4/objections-details-submit', function (req, res) {
  if (!req.session.data['objectionsDetails']) return res.render('v4/objections-details', { errors: true })
  v4Done(req, res, 'la-objections')
})

router.post('/v4/objections-evidence-submit', function (req, res) {
  v4Done(req, res, 'la-objections')
})

// --- Consent from religious bodies ---
router.post('/v4/religious-consent-required-next', function (req, res) {
  const answer = req.session.data['religiousConsentRequired']
  if (!answer) return res.render('v4/religious-consent-required', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'religious-consent')
  res.redirect('/v4/religious-consent-secured')
})

router.post('/v4/religious-consent-secured-next', function (req, res) {
  const answer = req.session.data['religiousConsentSecured']
  if (!answer) return res.render('v4/religious-consent-secured', { errors: true })
  res.redirect(answer === 'yes' ? '/v4/religious-consent-evidence' : '/v4/religious-consent-explain')
})

router.post('/v4/religious-consent-evidence-submit', function (req, res) {
  v4Done(req, res, 'religious-consent')
})

router.post('/v4/religious-consent-explain-submit', function (req, res) {
  if (!req.session.data['religiousConsentExplain']) return res.render('v4/religious-consent-explain', { errors: true })
  v4Done(req, res, 'religious-consent')
})

// --- Planning permission ---
router.post('/v4/planning-required-next', function (req, res) {
  const answer = req.session.data['planningRequired']
  if (!answer) return res.render('v4/planning-required', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'planning')
  res.redirect('/v4/planning-obtained')
})

router.post('/v4/planning-obtained-next', function (req, res) {
  const answer = req.session.data['planningObtained']
  if (!answer) return res.render('v4/planning-obtained', { errors: true })
  if (answer === 'no') return res.redirect('/v4/planning-explain')
  v4Done(req, res, 'planning')
})

router.post('/v4/planning-explain-submit', function (req, res) {
  if (!req.session.data['planningExplain']) return res.render('v4/planning-explain', { errors: true })
  v4Done(req, res, 'planning')
})

// --- Land transaction ---
router.post('/v4/land-transaction-required-next', function (req, res) {
  const answer = req.session.data['landTransactionRequired']
  if (!answer) return res.render('v4/land-transaction-required', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'land-transaction')
  res.redirect('/v4/land-transaction')
})

router.post('/v4/land-transaction-next', function (req, res) {
  const answer = req.session.data['landTransaction']
  if (!answer) return res.render('v4/land-transaction', { errors: true })
  if (answer === 'no') return res.redirect('/v4/land-transaction-explain')
  v4Done(req, res, 'land-transaction')
})

router.post('/v4/land-transaction-explain-submit', function (req, res) {
  if (!req.session.data['landTransactionExplain']) return res.render('v4/land-transaction-explain', { errors: true })
  v4Done(req, res, 'land-transaction')
})

// --- Admissions variation ---
router.post('/v4/admissions-variation-submit', function (req, res) {
  const answer = req.session.data['admissionsVariation']
  if (!answer) return res.render('v4/admissions-variation', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'admissions')
  res.redirect('/v4/admissions-changes')
})

router.post('/v4/admissions-changes-submit', function (req, res) {
  if (!req.session.data['admissionsChanges']) return res.render('v4/admissions-changes', { errors: true })
  res.redirect('/v4/admissions-draft')
})

router.post('/v4/admissions-draft-submit', function (req, res) {
  v4Done(req, res, 'admissions')
})

// --- Ofsted ---
router.post('/v4/ofsted-inspection-next', function (req, res) {
  const answer = req.session.data['ofstedInspection']
  if (!answer) return res.render('v4/ofsted-inspection', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'ofsted')
  res.redirect('/v4/ofsted-outcome')
})

router.post('/v4/ofsted-outcome-submit', function (req, res) {
  if (!req.session.data['ofstedOutcome']) return res.render('v4/ofsted-outcome', { errors: true })
  v4Done(req, res, 'ofsted')
})

// --- Intervention measures ---
router.post('/v4/intervention-eligible-next', function (req, res) {
  const answer = req.session.data['interventionEligible']
  if (!answer) return res.render('v4/intervention-eligible', { errors: true })
  if (answer === 'no') return v4Done(req, res, 'intervention')
  res.redirect('/v4/intervention-explain')
})

router.post('/v4/intervention-explain-submit', function (req, res) {
  if (!req.session.data['interventionExplain']) return res.render('v4/intervention-explain', { errors: true })
  res.redirect('/v4/independent-school-standards')
})

router.post('/v4/independent-school-standards-next', function (req, res) {
  const answer = req.session.data['independentSchoolStandards']
  if (!answer) return res.render('v4/independent-school-standards', { errors: true })
  res.redirect(answer === 'no' ? '/v4/independent-school-standards-explain' : '/v4/fire-safety-compliance')
})

router.post('/v4/independent-school-standards-explain-submit', function (req, res) {
  if (!req.session.data['issExplain']) return res.render('v4/independent-school-standards-explain', { errors: true })
  res.redirect('/v4/fire-safety-compliance')
})

router.post('/v4/fire-safety-compliance-next', function (req, res) {
  const answer = req.session.data['fireSafety']
  if (!answer) return res.render('v4/fire-safety-compliance', { errors: true })
  if (answer === 'no') return res.redirect('/v4/fire-safety-explain')
  v4Done(req, res, 'intervention')
})

router.post('/v4/fire-safety-explain-submit', function (req, res) {
  if (!req.session.data['fireSafetyExplain']) return res.render('v4/fire-safety-explain', { errors: true })
  v4Done(req, res, 'intervention')
})

// --- Public Sector Equality Duty ---
router.post('/v4/equality-duty-next', function (req, res) {
  const answer = req.session.data['equalityDuty']
  if (!answer) return res.render('v4/equality-duty', { errors: true })
  if (answer === 'likely') return res.redirect('/v4/equality-duty-mitigate')
  v4Done(req, res, 'psed')
})

router.post('/v4/equality-duty-mitigate-submit', function (req, res) {
  if (!req.session.data['equalityDutyMitigate']) return res.render('v4/equality-duty-mitigate', { errors: true })
  v4Done(req, res, 'psed')
})

// --- Check answers and submit ---
function v4AllComplete (data) {
  return V4_SECTIONS.every(section => section.items.every(([id]) => v4Task(data, id) === 'completed'))
}

const V4_LABELS = {
  yesNo: { 'yes': 'Yes', 'no': 'No' },
  hasChangeBeenMade: { 'yes': 'Yes', 'no': 'No' },
  consultationCompleted: { 'yes': 'Yes', 'in-progress': 'No, but a consultation is currently in progress', 'no': 'No' },
  yourRole: { 'chair': 'Chair of the academy trust', 'ceo': 'CEO of the academy trust', 'accounting-officer': 'Accounting officer' },
  equalityDuty: {
    'unlikely': 'Unlikely to affect disproportionately any particular person or group who share protected characteristics',
    'some-impact': 'There are some impacts but on balance analysis indicates the changes will not affect disproportionately any particular person or group who share protected characteristics',
    'likely': 'Likely to affect disproportionately any particular person or group who share protected characteristics'
  }
}

function v4Summary (data) {
  const sections = []
  let rows
  const section = title => { rows = []; sections.push({ title, rows }) }
  const row = (key, value, href) => {
    const r = { key: { text: key }, value: { text: (value || '').toString().trim() || 'Not answered' } }
    if (href) r.actions = { items: [{ href: href, text: 'Change', visuallyHiddenText: key.toLowerCase() }] }
    rows.push(r)
  }
  const yesNo = v => V4_LABELS.yesNo[v] || v
  const date = prefix => {
    const d = ['day', 'month', 'year'].map(p => data[prefix + '-' + p])
    return d.every(Boolean) ? d.join('/') : ''
  }
  const file = v => (v && typeof v === 'object') ? (v.name || 'File uploaded') : v

  section('Check before you start')
  row('Has the significant change already been made?', yesNo(data['hasChangeBeenMade']), '/v4/has-change-been-made')
  if (data['hasChangeBeenMade'] === 'yes') row('Contacted regional Delivery Officer', yesNo(data['contactedDo']), '/v4/contacted-do')
  row('Has a 3 week consultation been completed?', V4_LABELS.consultationCompleted[data['consultationCompleted']], '/v4/consultation-completed')

  section('Trust and academy')
  row('Trust name', data['trustName'], '/v4/trust-name')
  row('Companies House number', data['companiesHouseNumber'])
  row('Academy name', data['academyName'], '/v4/academy-name')
  row('Academy URN', data['academyUrn'])
  row('Local authority', data['localAuthority'])
  row('Your role', v4List(data['yourRole']).map(r => V4_LABELS.yourRole[r] || r).join(', '), '/v4/your-role')
  row('Full name', data['fullName'], '/v4/full-name')
  row('Email address', data['yourEmail'], '/v4/email-addresses')
  if (data['otherEmails']) row('Other email addresses', data['otherEmails'], '/v4/email-addresses')
  row('Phone number', data['phoneNumber'], '/v4/phone-number')

  section('Significant change details')
  v4ChangePages(data).forEach(page => {
    (V4_CHANGE_PAGES[page] || []).forEach(field => {
      let value = data[field.name]
      const href = '/v4/change/' + page
      if (field.options) {
        const chosen = v4List(value)
        value = chosen.map(v => field.options[v] || v).join(', ')
        if (!field.required && !chosen.length) return
        chosen.forEach(v => {
          const extra = field.details && field.details[v] && data[field.details[v]]
          if (extra) value += ': ' + extra
        })
      } else if (!field.required && !value) {
        return
      }
      row(field.label, value, href)
    })
  })
  row('Effective date of the change', date('effective-date'), '/v4/effective-date')

  section('Consultation')
  row('Consultation start date', date('consultation-start'), '/v4/consultation-dates')
  row('Consultation end date', date('consultation-end'), '/v4/consultation-dates')
  row('Summary of the consultation outcomes', data['consultationSummary'], '/v4/consultation-summary')
  row('Evidence of the consultation outcomes', file(data['consultationEvidence']), '/v4/consultation-evidence')

  section('Funding')
  row('Is funding required to make the change?', yesNo(data['fundingRequired']), '/v4/funding-required')
  if (data['fundingRequired'] === 'yes') {
    row('Has funding been secured?', yesNo(data['fundingSecured']), '/v4/funding-secured')
    row('How will the change be funded?', data['fundingDetails'], '/v4/funding-details')
  }

  section('Consent and permissions')
  row('Has a local authority raised any objections?', yesNo(data['laObjections']), '/v4/local-authority-objections')
  if (data['laObjections'] === 'yes') row('What were the objections?', data['objectionsDetails'], '/v4/objections-details')
  if (data['laObjections'] === 'no') row('Evidence of no objections', file(data['objectionsEvidence']), '/v4/objections-evidence')
  row('Is consent from a religious body required?', yesNo(data['religiousConsentRequired']), '/v4/religious-consent-required')
  if (data['religiousConsentRequired'] === 'yes') {
    row('Has consent been secured?', yesNo(data['religiousConsentSecured']), '/v4/religious-consent-secured')
    if (data['religiousConsentSecured'] === 'no') row('Why has consent not been secured?', data['religiousConsentExplain'], '/v4/religious-consent-explain')
  }
  row('Is planning permission required?', yesNo(data['planningRequired']), '/v4/planning-required')
  if (data['planningRequired'] === 'yes') {
    row('Has planning permission been obtained?', yesNo(data['planningObtained']), '/v4/planning-obtained')
    if (data['planningObtained'] === 'no') row('Why has planning permission not been obtained?', data['planningExplain'], '/v4/planning-explain')
  }
  row('Is a land transaction proposal required?', yesNo(data['landTransactionRequired']), '/v4/land-transaction-required')
  if (data['landTransactionRequired'] === 'yes') {
    row('Has a land transaction proposal been submitted?', yesNo(data['landTransaction']), '/v4/land-transaction')
    if (data['landTransaction'] === 'no') row('Why has a land transaction proposal not been submitted?', data['landTransactionExplain'], '/v4/land-transaction-explain')
  }

  section('Admissions variation')
  row('Do you need to request an admissions variation?', yesNo(data['admissionsVariation']), '/v4/admissions-variation')
  if (data['admissionsVariation'] === 'yes') row('What are the proposed admissions changes?', data['admissionsChanges'], '/v4/admissions-changes')

  section('Academy performance')
  row('Ofsted inspection in the last 2 months?', yesNo(data['ofstedInspection']), '/v4/ofsted-inspection')
  if (data['ofstedInspection'] === 'yes') row('Ofsted outcome', data['ofstedOutcome'], '/v4/ofsted-outcome')
  row('Is the academy eligible for intervention measures?', yesNo(data['interventionEligible']), '/v4/intervention-eligible')
  if (data['interventionEligible'] === 'yes') {
    row('Why is the academy eligible?', data['interventionExplain'], '/v4/intervention-explain')
    row('Will the academy continue to meet the independent school standards?', yesNo(data['independentSchoolStandards']), '/v4/independent-school-standards')
    row('Will the proprietor continue to comply with the Fire Safety Order?', yesNo(data['fireSafety']), '/v4/fire-safety-compliance')
  }

  section('Public Sector Equality Duty Statement')
  row('Statement', V4_LABELS.equalityDuty[data['equalityDuty']], '/v4/equality-duty')
  if (data['equalityDuty'] === 'likely') row('How will the impact be mitigated?', data['equalityDutyMitigate'], '/v4/equality-duty-mitigate')

  return sections
}

router.get('/v4/check-answers', function (req, res) {
  res.render('v4/check-answers', { allComplete: v4AllComplete(req.session.data), summary: v4Summary(req.session.data) })
})

router.post('/v4/confirmation', function (req, res) {
  if (!v4AllComplete(req.session.data)) return res.redirect('/v4/check-answers')
  req.session.data['applicationReference'] = 'TSC-2026-0142'
  res.render('v4/confirmation')
})
