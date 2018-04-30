import { BaseFieldEditor } from 'litium-ui';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';

@Component({
    selector: 'field-editor-google-map-setting',
    templateUrl: './field-editor-google-map-setting.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldEditorGoogleMapSetting extends BaseFieldEditor {
    label = 'Google Map Api';

    constructor(protected _changeDetectorRef: ChangeDetectorRef) {
        super(_changeDetectorRef);
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