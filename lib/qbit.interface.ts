import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface QbitModuleOptions {
  clientId: string;
  clientSecret: string;
  baseUrl?: string;
}

/**
 * Interface describing a `QbitOptionsFactory`.  Providers supplying configuration
 * options for the Qbit module must implement this interface.
 * @publicApi
 */
export interface QbitOptionsFactory {
  createQbitOptions(): Promise<QbitModuleOptions> | QbitModuleOptions;
}

/**
 * Options for dynamically configuring the Qbit module.
 * @publicApi
 */
export interface QbitModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  /**
   * Injection token resolving to an existing provider. The provider must implement
   * the `QbitOptionsFactory` interface.
   */
  useExisting?: Type<QbitOptionsFactory>;
  /**
   * Injection token resolving to a class that will be instantiated as a provider.
   * The class must implement the `QbitOptionsFactory` interface.
   */
  useClass?: Type<QbitOptionsFactory>;
  /**
   * Function returning options (or a Promise resolving to options) to configure the
   * cache module.
   */
  useFactory?: (...args: any[]) => Promise<QbitModuleOptions> | QbitModuleOptions;
  /**
   * Dependencies that a Factory may inject.
   */
  inject?: any[];
  extraProviders?: Provider[];
}
