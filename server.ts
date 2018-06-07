// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
// * NOTE :: leave this until @hapiness/core will be migrated to rxjs v6
import 'rxjs-compat';
 
import { enableProdMode, Injectable, Inject } from '@angular/core';
import { Hapiness, HapinessModule, HttpServerExt, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { NgUniversalModule } from '@hapiness/ng-universal';
import { join } from 'path';
import { Request, REQUEST } from '@hapiness/ng-universal';
 
@Injectable()
export class RequestService {
  constructor(@Inject(REQUEST) private _request: Request) {}
}

const BROWSER_FOLDER = join(process.cwd(), 'dist', 'browser');
 
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
 
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
 
// Create our Hapiness application
@HapinessModule({
  version: '1.0.0',
  imports: [
    NgUniversalModule.setConfig({
      bootstrap: AppServerModuleNgFactory,
      lazyModuleMap: LAZY_MODULE_MAP,
      staticContent: {
        indexFile: 'index.html',
        rootPath: BROWSER_FOLDER
      }
    })
  ],
  providers: [
    HttpServerService
  ]
})
class HapinessApplication implements OnStart, OnError {
  /**
   * Class constructor
   *
   * @param {HttpServerService} _httpServer DI for HttpServerService to provide .instance() method to give original Hapi.js server
   */
  constructor(private _httpServer: HttpServerService) {
  }
 
  /**
   * OnStart process
   */
  onStart(): void {
    console.log(`Node server listening on ${this._httpServer.instance().info.uri}`);
  }
 
  /**
   * OnError process
   */
  onError(error: Error): void {
    console.error(error);
  }
}
 
// Boostrap Hapiness application
Hapiness.bootstrap(HapinessApplication, [
  HttpServerExt.setConfig({
    host: 'localhost',
    port: 4200
  })
]);