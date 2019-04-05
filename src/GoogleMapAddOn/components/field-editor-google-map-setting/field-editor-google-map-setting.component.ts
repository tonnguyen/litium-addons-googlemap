import { BaseFieldEditor } from 'litium-ui';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'field-editor-google-map-setting',
    templateUrl: './field-editor-google-map-setting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldEditorGoogleMapSetting extends BaseFieldEditor implements OnInit {
    constructor(protected _changeDetectorRef: ChangeDetectorRef) {
        super(_changeDetectorRef);
    }

    ngOnInit() {
        super.ngOnInit();
        this.label = 'Google Map Api';
    }

    public getMapKey(language: string): any {
        const option = this.getValue(language);
        return option.option.mapApiKey || '';
    }

    mapKeyChange(mapApiKey = '', editLanguage = '*') {
        const option = this.getValue(editLanguage);
        this.valueChange({
            ...option,
            option: {
                ...option.option,
                mapApiKey,
            }
        }, editLanguage);
    }
}