const AWS = require('aws-sdk');

class AWSService {

  private Bucket = 'arcs-seico';
  private s3 = new AWS.S3();

  putObjectS3(paramsS3: ParamsS3PutObject, callback: Function){
    paramsS3.Bucket = this.Bucket;
    return this.s3.putObject(paramsS3, callback);
  }

  getObjectS3(paramsS3: ParamsS3GetObject, callback?: Function){
    paramsS3.Bucket = this.Bucket;
    return this.s3.getObject(paramsS3, callback);
  }

  deleteObjectS3(paramsS3: ParamsS3GetObject, callback?: Function){
    paramsS3.Bucket = this.Bucket;
    return this.s3.deleteObject(paramsS3, callback);
  }

}

export class ParamsS3PutObject {
  Key
  Bucket?
  Body?
  ContentEncoding?
  ContentType?
}

export class ParamsS3GetObject {
  Key: string;
  Bucket?: string
  IfMatch?: string;
  IfModifiedSince?: Date;
  IfNoneMatch?: string;
  IfUnmodifiedSince?: Date;
  PartNumber?: number;
  Range?: string;
  ResponseCacheControl?: string;
  ResponseContentDisposition?: string;
  ResponseContentEncoding?: string;
  ResponseContentLanguage?: string;
  ResponseContentType?: string;
  ResponseExpires?: Date;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: Buffer;
  SSECustomerKeyMD5?: string;
  VersionId?: string;
}

export const aws = new AWSService();