import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoader, MapsAPILoader, LatLngLiteral } from 'tonnguyen-agm-core';
import { BROWSER_GLOBALS_PROVIDERS } from 'tonnguyen-agm-core/utils/browser-globals';
import { ControlPosition } from 'tonnguyen-agm-core/services/google-maps-types';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { BaseFieldEditor } from 'litium-ui';

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
        {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
        {provide: LAZY_MAPS_API_CONFIG, useValue: { apiKey: 'AIzaSyBJDVg4_D41CYzcJgsfPAvZ3sSNjKi_Jtw', libraries: ['places'] }},
    ],
})
export class FieldEditorGoogleMap extends BaseFieldEditor implements OnInit {
    private _currentLocation = {};
    private _zoom = {};
    previewModeKey = 'preview';
    editModeKey = 'edit';
    searchPosition = ControlPosition.TOP_LEFT;

    constructor(private changeDetection: ChangeDetectorRef) {
        super(changeDetection);
    }

    ngOnInit() {
        super.ngOnInit();
        this._currentLocation[this._getKey(this.previewModeKey, this.viewLanguage)] = this.getValue(this.viewLanguage);
        this._currentLocation[this._getKey(this.editModeKey, this.editLanguage)] = this.getValue(this.editLanguage);
    }

    getCurrentLocation = (mode: string, language: string): any => this._currentLocation[this._getKey(mode, language)];
    getZoom = (mode: string, language: string): any => this._zoom[this._getKey(mode, language)];

    onCenterChange(event: LatLngLiteral, mode: string, language: string) {
        this._currentLocation[this._getKey(mode, language)] = event;
    }

    onZoomChange(zoom: number, mode: string, language: string) {
        this._zoom[this._getKey(mode, language)] = zoom;
    }

    onLocationChoose(location) {
        this.valueChange({ ...location }, this.editLanguage);
    }

    private _getKey = (mode: string, language: string) => `${mode}-${language}`;
}