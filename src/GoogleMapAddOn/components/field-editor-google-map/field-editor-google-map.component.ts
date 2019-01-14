import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { BaseFieldEditor, Debounce } from 'litium-ui';
import {
    DelayedConfigMapsApiLoader,
    LatLngLiteral,
    LAZY_MAPS_API_CONFIG_FUNCTION,
    LazyMapsAPILoaderConfigLiteral,
    MapsAPILoader
} from 'tonnguyen-agm-core';
import { ControlPosition } from 'tonnguyen-agm-core/services/google-maps-types';
import { BROWSER_GLOBALS_PROVIDERS } from 'tonnguyen-agm-core/utils/browser-globals';

export function mapConfigFactory(editor: FieldEditorGoogleMap) {
    return (): LazyMapsAPILoaderConfigLiteral => ({
        apiKey: editor.value['*'] ? editor.value['*'].MapApiKey || editor.value['*'].mapApiKey : '',
        libraries: ['places']
    });
}

@Component({
    selector: 'field-editor-google-map',
    templateUrl: './field-editor-google-map.component.html',
    styles: [`
        agm-map {
            width: 100%;
            height: 300px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ...BROWSER_GLOBALS_PROVIDERS,
        {provide: MapsAPILoader, useClass: DelayedConfigMapsApiLoader},
        {provide: LAZY_MAPS_API_CONFIG_FUNCTION, useFactory: mapConfigFactory, deps: [FieldEditorGoogleMap]},
    ],
})
export class FieldEditorGoogleMap extends BaseFieldEditor implements OnInit {
    private _currentLocation = {};
    private _zoom = {};
    previewModeKey = 'preview';
    editModeKey = 'edit';
    searchPosition = ControlPosition.TOP_LEFT;

    constructor(changeDetection: ChangeDetectorRef) {
        super(changeDetection);
    }

    ngOnInit() {
        super.ngOnInit();
        this._currentLocation[this._getKey(this.previewModeKey, this.viewLanguage)] = this.getValue(this.viewLanguage);
        this._currentLocation[this._getKey(this.editModeKey, this.editLanguage)] = this.getValue(this.editLanguage);
    }

    getValue(language: string): any {
        const value = super.getValue(language);
        return this._normalize(value);
    }

    private _normalize(value: any): LatLngLiteral {
        if (!value) {
            return null;
        }
        return {
            ...value,
            lat: value.Lat || value.lat,
            lng: value.Lng || value.lng,
        };
    }

    getCurrentLocation = (mode: string, language: string): any => this._currentLocation[this._getKey(mode, language)];
    getZoom = (mode: string, language: string): any => this._zoom[this._getKey(mode, language)];

    @Debounce(50)
    onCenterChange(event: LatLngLiteral, mode: string, language: string) {
        this._currentLocation[this._getKey(mode, language)] = this._normalize(event);
        this._changeDetection.markForCheck();
    }

    @Debounce(50)
    onZoomChange(zoom: number, mode: string, language: string) {
        this._zoom[this._getKey(mode, language)] = zoom;
        this._changeDetection.markForCheck();
    }

    onLocationChoose(location) {
        this.valueChange({ ...location }, this.editLanguage);
    }

    private _getKey = (mode: string, language: string) => `${mode}-${language}`;
}