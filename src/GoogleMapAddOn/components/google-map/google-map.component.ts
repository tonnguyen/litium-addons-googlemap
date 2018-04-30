import { BaseFieldEditor } from 'litium-ui';
import {
    DelayedConfigMapsApiLoader,
    LAZY_MAPS_API_CONFIG_FUNCTION,
    LazyMapsAPILoaderConfigLiteral,
    MapsAPILoader
} from 'tonnguyen-agm-core';
import { ControlPosition } from 'tonnguyen-agm-core/services/google-maps-types';
import { BROWSER_GLOBALS_PROVIDERS } from 'tonnguyen-agm-core/utils/browser-globals';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';

export function mapConfigFactory(editor: GoogleMap) {
    return (): LazyMapsAPILoaderConfigLiteral => ({
        apiKey: editor.mapApiKey,
        libraries: ['places']
    });
}

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
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
        {provide: LAZY_MAPS_API_CONFIG_FUNCTION, useFactory: mapConfigFactory, deps: [GoogleMap]},
    ],
})
export class GoogleMap {
    searchPosition = ControlPosition.TOP_LEFT;
    lat: number;
    lng: number;
    zoom: number = 10;
    markerLat: number;
    markerLng: number;
    mapApiKey: string;
    language: string;
    fieldId: string;
    mode: string;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {

    }

    public send(action: string, value: any) {
        const data = {
            action, 
            language: this.language, 
            fieldId: this.fieldId, 
            value,
        };
        this.sendToHost('googleMap', data);
    }

    /**
     * Sends the message to parent page.
     */
    public sendToHost(source: string, value: any) {
        window.top.postMessage({ source, value }, window.location.origin);
    }

    /**
     * Sets actual component's attribute value.
     */
    public setAttribute(name: string, value: any) {
        if (name.toLowerCase().indexOf('lat') >= 0 || 
            name.toLowerCase().indexOf('lng') >= 0 ||
            name.toLowerCase().indexOf('zoom') >= 0) {
            this[name] = +value;
            return;
        }
        this[name] = value;
    }
}