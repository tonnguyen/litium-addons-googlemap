import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FieldEditorGoogleMap } from './components/field-editor-google-map/field-editor-google-map.component';
import { FieldEditorGoogleMapSetting } from './components/field-editor-google-map-setting/field-editor-google-map-setting.component';
import { UiModule } from 'litium-ui';
import { AgmCoreModule } from 'tonnguyen-agm-core';

@NgModule({
    declarations: [
        FieldEditorGoogleMap,
        FieldEditorGoogleMapSetting,
    ],
    imports: [ 
        AgmCoreModule,
        CommonModule,
        UiModule,
        TranslateModule,
    ]
})
export class GoogleMapAddOn {
    
}