// Full route logic for the Tier 1 significant change application.
// Copy this into app/routes.js (replaces the previous routes-snippet.js content).

// --- Has the change already been made? ---
router.post('/path/of/next/page', function (req, res) {
  const answer = req.session.data['hasChangeBeenMade']
  if (answer !== 'yes' && answer !== 'no') {
    return res.render('has-change-been-made', { errors: true })
  }
  res.redirect(answer === 'no' ? '/contacted-do' : '/consultation-completed')
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
router.post('/trust-name-submit', function (req, res) {
  if (!req.session.data['trustName']) {
    return res.render('trust-name', { errors: true })
  }
  res.redirect('/companies-house-number')
})

router.post('/companies-house-number-submit', function (req, res) {
  if (!req.session.data['companiesHouseNumber']) {
    return res.render('companies-house-number', { errors: true })
  }
  res.redirect('/academy-name')
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
  res.redirect('/about-significant-change')
})

router.post('/about-significant-change-submit', function (req, res) {
  if (!req.session.data['reason']) {
    return res.render('about-significant-change', { errors: true })
  }
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
  if (!req.session.data['effectiveDate-day']) {
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
  res.redirect(answer === 'yes' ? '/intervention-explain' : '/independent-school-standards')
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
