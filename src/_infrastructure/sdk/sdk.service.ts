import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { resolve } from 'path';
import { ConfigSchema } from 'src/config/config.schema';
import { generateApi, GenerateApiOutput } from 'swagger-typescript-api';

type FileInfo = {
  /** @example myFilename */
  fileName: string;
  /** @example .d.ts */
  fileExtension: string;
  /** content of the file */
  fileContent: string;
};

@Injectable()
export class SdkService {
  constructor(
    private configService: ConfigService,
    @Inject(REQUEST) private request: Request,
  ) { }

  private _output: GenerateApiOutput;

  get fileName() {
    const { APP_NAME: NAME } = this.configService.getOrThrow<ConfigSchema['APP']>("APP");

    return NAME.toLowerCase().replaceAll(" ", "-");
  }

  get className() {
    const { APP_NAME: NAME } = this.configService.getOrThrow<ConfigSchema['APP']>("APP");

    return NAME
      .replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .replaceAll(" ", "");
  }

  get file(): FileInfo | null {
    if (!this._output) return null;

    const file = this._output.files[0];

    file.fileContent = file.fileContent.replace("export class Api<", `export class ${this.className}<`);

    return {
      ...file,
      fileContent: `/* eslint-disable */\n/* tslint:disable */\n\n${file.fileContent}`,
    };
  }

  get jsonSourceUrl() {
    return `http://${this.request.headers["host"]}/api-json`;
  }

  async make(): Promise<FileInfo> {
    if (this.file) return this.file;

    const output = await generateApi({
      name: this.fileName,
      url: this.jsonSourceUrl,
      output: resolve(process.cwd(), "./dist/_out/sdk"),
      httpClientType: "axios",
      defaultResponseAsSuccess: true,
      extractEnums: true,
      defaultResponseType: "void",
      extractResponseError: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractRequestParams: true,
      generateResponses: true,
    });

    this._output = output;

    return this.file;
  }
}