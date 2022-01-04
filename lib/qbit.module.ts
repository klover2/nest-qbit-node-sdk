import { DynamicModule, Module, Provider } from '@nestjs/common';
import { QBIT_MANAGER, QBIT_MODULE_OPTIONS } from './qbit.constants';
import { QbitModuleAsyncOptions, QbitOptionsFactory } from './qbit.interface';
import { createQbitManager } from './qbit.providers';

@Module({})
export class QbitModule {
  static registerAsync(options: QbitModuleAsyncOptions): DynamicModule {
    return {
      module: QbitModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])],
      exports: [options?.name || QBIT_MANAGER],
    };
  }

  private static createAsyncProviders(options: QbitModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options), createQbitManager(options.name)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
        createQbitManager(options.name),
      ];
    }
    return [];
  }

  private static createAsyncOptionsProvider(options: QbitModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: QBIT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: QBIT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: QbitOptionsFactory) => optionsFactory.createQbitOptions(),
      inject: [options?.useExisting || options?.useClass || ''],
    };
  }
}
