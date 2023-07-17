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
  


Given(/^A web browser is at the "(Main)" page$/, page => {
    goToUrl(page);
});