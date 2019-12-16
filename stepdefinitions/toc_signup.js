import 'testcafe';
import {Selector} from "testcafe";
import { ClientFunction } from 'testcafe';
import  getConfirmToken  from 'src/library/fetchconfirmtoken.js';


fixture ('Regression: Palgrave TOC widget').page('https://www.qa.sgw.palgrave.com/gp/journal/41286');

test(`TC01 Verify TOC widget availability`, async t => {
    const signup = await Selector ('#alert-widget_body')
    await t.eval(() => location.reload(true))
    if (!signup.exists) {
        await t.eval(() => location.reload(true))
    }
    await t .expect(signup.exists).ok()

});

test(`TC02 Verify input email is mandatory`, async t => {
    const email = Selector('#sign-up-email')
    email.getAttribute("required")
        .then((data) => {
            t.expect(data).eql("required")
        })
        .catch((err) => {
            console.log(err);
        });

});

test(`TC03 Validate input email address format`, async t => {
    const email = Selector('#sign-up-email')
    email.getAttribute("type")
        .then((data) => {
            t.expect(data).eql("email")
        })
        .catch((err) => {
            console.log(err);
        });

});

test(`TC04 Verify toc alert sign up`, async t => {
    const email = Selector ('#sign-up-email')
    const submit= Selector('button').withText('Sign up now')
    await t
        .click(email)
        .typeText(email, 'testspringer0@gmail.com')
        .click(submit)
        await t
        .expect(Selector('*').withText("Thanks for signing up! Please check your email to confirm your subscription").visible).ok()
});

test(`TC05 Verify toc alert sign up conflict`, async t => {
    const email = Selector ('#sign-up-email')
    const submit= Selector('button').withText('Sign up now')
    await t
        .click(email)
        .typeText(email, 'testspringer1@gmail.com')
        .click(submit)
        await t
        .expect(Selector('*').withText("You are already subscribed for this journal").visible).ok()
});



fixture ('Regression: Springer TOC subscription page').page('https://www.qa.sgw.springer.com/alerts-frontend/subscribe?journalNo=10483');

test(`TC01 Verify toc subscription page elements`, async t => {
    const submit= Selector('button').withText('Subscribe')
    const title=Selector("title")
    const logo = Selector ('*').withAttribute('alt','springer logo')
    const heading=Selector ('.u-marginTopS')
    const bodytext=Selector ('#body')
    const journalurl= Selector('a').withText('Applied Mathematics and Mechanics')
    const springerlink= Selector('a').withText('SpringerLink')

    await t
        .expect((title).innerText).eql('Springer login and registration')
        .expect(submit.exists).ok()
        .expect(logo.exists).ok()
        .expect((heading).innerText).eql('Stay informed with Journal Alerts')
        .expect ((bodytext).innerText).eql('Sign up to receive the table of contents of a new issue for Applied Mathematics and Mechanics when the issue is available online at SpringerLink.')
        .expect((journalurl).getAttribute('href')).eql('http://test-www.springer.com/journal/10483')
        .expect((springerlink).getAttribute('href')).eql('http://link-qa.springer.com/')
});

test(`TC02 Verify double opt in text display`, async t => {
    const email = Selector('#email')
    const submit = Selector('button').withText('Subscribe')
    const heading=Selector ('.u-marginTopS')
    const bodytext=Selector ('#body')
    const journalurl= Selector('a').withText('Applied Mathematics and Mechanics')
    await t
        .click(email)
        .typeText(email, 'testspringer@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("").visible).ok()
        .expect((heading).innerText).eql('You\'re almost there, please check your email')
        .expect((journalurl).getAttribute('href')).eql('http://test-www.springer.com/journal/10483')

});


test(`TC03 Verify input email is mandatory`, async t => {
    const email = Selector('#email')
    const submit = Selector('button').withText('Subscribe')
    await t
        .click(email)
        .click(submit)
        .expect(Selector('*').withText("Please enter a valid email address").visible).ok()
});


test(`TC04 Validate input email address format`, async t => {
    const email = Selector('#email')
    const submit = Selector('button').withText('Subscribe')
    await t
        .click(email)
        .typeText(email, 'testspringer1')
        .click(submit)
        .expect(Selector('*').withText("Please enter a valid email address").visible).ok()
        .click(email)
        .typeText(email, 'testspringer@1@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("Please enter a valid email address").visible).ok()
        .click(email)
        .typeText(email, '@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("Please enter a valid email address").visible).ok()
        .click(email)
        .typeText(email, 'testspringer@gmail..com')
        .click(submit)
        .expect(Selector('*').withText("Please enter a valid email address").visible).ok()

});



fixture ('E2E : Springer TOC Subscription journey').page('https://test-www.springer.com/journal/10483');

test(`TC01 Redirection to new TOC subscription page`, async t => {

    const alertlink= Selector('.c-journal-nav__link').withText("Sign up for alerts")
    await t
        .hover(alertlink)
        .click(alertlink)
    const getLocation = ClientFunction(() => document.location.href);
    await t
        .expect(getLocation()).contains('https://www.qa.sgw.springer.com/alerts-frontend/subscribe?journalNo=10483')
    const submit= Selector('button').withText('Subscribe')
    await t
        .expect(Selector("title").innerText).eql('Springer login and registration')
        .expect(submit.exists).ok()
});


test(`TC02 Redirection to existing alerts page`, async t => {
        await t
            .navigateTo('https://test-www.springer.com/journal/11207')
        await t
        const alertlink= Selector('.c-journal-nav__link').withText("Sign up for alerts")
        await t
            .hover(alertlink)
            .click(alertlink)
        const getLocation = ClientFunction(() => document.location.href);
        await t
            .expect(getLocation()).contains('https://www.qa.sgw.springer.com/gp/stay-informed-with-springer-alerts/54290')
            .expect(Selector("title").innerText).eql('Stay informed with Springer Alerts')

});


test(`TC03 Verify toc sign up success flow`, async t => {

    const alertlink= Selector('.c-journal-nav__link').withText("Sign up for alerts")
    await t
        .hover(alertlink)
        .click(alertlink)
    const email = Selector ('#email')
    const submit= Selector('button').withText('Subscribe')
    await t
        .click(email)
        .typeText(email, 'testspringer6@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("You're almost there, please check your email").visible).ok()
});

test(`TC04 Verify toc sign up conflict flow`, async t => {

    const alertlink= Selector('.c-journal-nav__link').withText("Sign up for alerts")
    await t
        .hover(alertlink)
        .click(alertlink)
    const email = Selector ('#email')
    const submit= Selector('button').withText('Subscribe')
    await t
        .click(email)
        .typeText(email, 'testspringer1@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("You’ve already signed up to receive emails for this journal").visible).ok()
});

fixture ('dry run').page('https://test-www.springer.com/journal/10483');

test(`Verify toc confirm page`, async t => {
  const token= getConfirmToken()
    console.log(token)
    await t
        .navigateTo('https://sprcom-alerts-ui-qa.dev.cf.private.springer.com/alerts/toc/confirm?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1Nzg4Mzg4MjQsImlhdCI6MTU3NjI0NjgyNCwiZW1haWwiOiJ0ZXN0c3ByaW5nZXIwQGdtYWlsLmNvbSIsImxhbmd1YWdlIjpudWxsLCJqb3VybmFsTm8iOjQxMjg2LCJqb3VybmFsVGl0bGUiOiJTdWJqZWN0aXZpdHkiLCJpc1Byb21vdGlvbiI6bnVsbCwiaW1wcmludCI6bnVsbH0.CTTnxRkwRGXBdZJG3qLUJRhchDnpKrHgZvqj2Adjg-Q&flavour=palgrave')
    await t
        .expect(Selector(".confirmation-content").innerText).contains('You have already confirmed your email address!')

});
