import 'testcafe';
import {Selector} from "testcafe";

fixture ('Palgrave TOC widget').page('https://www.qa.sgw.palgrave.com/gp/journal/41286');

test(`Verify TOC widget availability`, async t => {
    const signup = await Selector ('#alert-widget_body')
    if (!signup.exists)
    await t.eval(() => location.reload(true))
    await t
        .expect(signup.exists).ok();
         //console.log ("Toc widget exists for this journal");

});

test(`Verify toc alert sign up`, async t => {
    const email = Selector ('#sign-up-email')
    const submit= Selector('button').withText('Sign up now')
    await t
        .click(email)
        .typeText(email, 'testspringer6@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("Thanks for signing up! Please check your email to confirm your subscription").visible).ok()
});

test(`Verify toc alert sign up conflict`, async t => {
    const email = Selector ('#sign-up-email')
    const submit= Selector('button').withText('Sign up now')
    await t
        .click(email)
        .typeText(email, 'testspringer1@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("You are already subscribed for this journal").visible).ok()
});


fixture ('Springer TOC subscription').page('http://snrc-alerts-frontend-qa.dev.cf.private.springer.com/subscribe?journalNo=41260');

test(`Verify landing page availability`, async t => {
    const submit= Selector('button').withText('Subscribe')
    await t
        .expect(Selector("title").innerText).eql('Springer login and registration')
        .expect(submit.exists).ok()
    console.log ("page displayed successfully");

});

test(`Verify toc sign up`, async t => {
    const email = Selector ('#email')
    const submit= Selector('button').withText('Subscribe')
    await t
        .click(email)
        .typeText(email, 'testspringer6@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("Please check your email to confirm your subscription").visible).ok()
});

test(`Verify toc sign up conflict`, async t => {
    const email = Selector ('#email')
    const submit= Selector('button').withText('Subscribe')
    await t
        .click(email)
        .typeText(email, 'testspringer1@gmail.com')
        .click(submit)
        .expect(Selector('*').withText("You are already subscribed").visible).ok()
});