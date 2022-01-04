import { Provider } from '@nestjs/common';
import { QBIT_MANAGER, QBIT_MODULE_OPTIONS } from './qbit.constants';
import { QbitModuleOptions } from './qbit.interface';
import { loadPackage } from './util';

/**
 * Creates a QbitManager Provider.
 *
 * @publicApi
 */
export function createQbitManager(name?: string): Provider {
  return {
    provide: name || QBIT_MANAGER,
    useFactory: (options: QbitModuleOptions) => {
      const qbitManager = loadPackage('qbit-node-sdk', 'QbitModule', () => require('qbit-node-sdk'));
      if (options?.baseUrl) return new qbitManager(options.clientId, options.clientSecret, options.baseUrl);
      return new qbitManager(options.clientId, options.clientSecret);
    },
    inject: [QBIT_MODULE_OPTIONS],
  };
}
