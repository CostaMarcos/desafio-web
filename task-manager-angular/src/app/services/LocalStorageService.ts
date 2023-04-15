import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    setObject(object:any) {
        for (const [key, value] of Object.entries(object)) {
            console.log(`${key}: ${value}`);
            this.set(key, value as string);
        }
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}