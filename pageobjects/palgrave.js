import {Selector, t} from 'testcafe';

class journalPage {
   tocwidget: Selector = Selector (`#sign-up-form`);
   inputemail: Selector = Selector (`##sign-up-email`);
   signupbutton: Selector= Selector('button').withText('Sign up now');
   any: Selector= Selector (`*`);
}
