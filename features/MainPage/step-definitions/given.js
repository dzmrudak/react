import { BeforeAll, AfterAll, Given } from '@wdio/cucumber-framework';
import goToUrl from '../support/actions/goToUrl';
import {app, server} from '../../../server';

BeforeAll(async () => {
    await new Promise((resolve) => {
      server.on('listening', resolve);
    });
  });
  
  AfterAll(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });
  


Given(/^A web browser is at the "(Main)" page$/, async page => {
    goToUrl(page);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const elements = await $$('*'); // Fetch all elements on the page
    console.log('All Elements on the Page:', elements.length);
    // Log information about each element
    const pageSource = await browser.getPageSource();
    console.log('Page Source:', pageSource);
});