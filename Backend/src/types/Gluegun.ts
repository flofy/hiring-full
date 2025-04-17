declare module 'gluegun' {
    export interface GluegunParameters {
      first: string;
      second?: string;
      third?: string;
      fourth?: string;
      fifth?: string;
      options: Record<string, any>;
      argv: string[];
      array: string[];
      string: string[];
      raw: string[];
    }
  
    export interface GluegunPrint {
      info: (message: string) => void;
      success: (message: string) => void;
      warning: (message: string) => void;
      error: (message: string) => void;
      debug: (message: string) => void;
      table: (data: any[], options?: any) => void;
      spin: (message?: string) => any;
      colors: any;
    }
  
    export interface GluegunToolbox {
      parameters: GluegunParameters;
      print: GluegunPrint;
      prompt: any;
      filesystem: any;
      system: any;
      patching: any;
      template: any;
      http: any;
      meta: any;
      strings: any;
    }
  
    export function build(): any;
  }