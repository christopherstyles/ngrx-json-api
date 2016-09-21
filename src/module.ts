import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';

import {
    Http, HttpModule
} from '@angular/http';

import { EffectsModule } from '@ngrx/effects';

import { NgrxJsonApi } from './api';
import { NgrxJsonApiEffects } from './effects';
import { NgrxJsonApiActions } from './actions';
import { NgrxJsonApiSelectors } from './selectors';
import { ResourceDefinition } from './interfaces';

export const API_URL = new OpaqueToken('API_URL');

export const RESOURCES_DEFINITIONS = new OpaqueToken('RESOURCES_DEFINTIONS');

export const NGRX_JSON_API_STORE_LOCATION = new OpaqueToken(
    'NGRX_JSON_API_STORE_LOCATION')

export const apiFactory = (
    http: Http,
    apiUrl: string,
    resourcesDefinitions: Array<ResourceDefinition>) => {
    return new NgrxJsonApi(http, apiUrl, resourcesDefinitions);
};

export const selectorsFactory = (storeLocation: string) => {
    return new NgrxJsonApiSelectors(storeLocation);
}

export const configure = (
    apiUrl: string,
    resourcesDefinitions: Array<ResourceDefinition>,
    storeLocation: string): Array<any> => {
    return [
        {
            provide: NgrxJsonApi,
            useFactory: apiFactory,
            deps: [Http, API_URL, RESOURCES_DEFINITIONS]
        },
        {
            provide: NgrxJsonApiSelectors,
            useFactory: selectorsFactory,
            deps: [NGRX_JSON_API_STORE_LOCATION]
        },
        {
            provide: NGRX_JSON_API_STORE_LOCATION, useValue: storeLocation
        },
        {
            provide: API_URL, useValue: apiUrl
        },
        {
            provide: RESOURCES_DEFINITIONS, useValue: resourcesDefinitions
        }

    ]
}

@NgModule({
    imports: [
      HttpModule,
      EffectsModule.run(NgrxJsonApiEffects)
    ]
})
export class NgrxJsonApiModule {
    static configure(apiUrl: string,
        resourcesDefinitions: Array<ResourceDefinition>,
        storeLocation: string): ModuleWithProviders {
        return {
            ngModule: NgrxJsonApiModule,
            providers: configure(apiUrl, resourcesDefinitions, storeLocation)
        };
    }
};
