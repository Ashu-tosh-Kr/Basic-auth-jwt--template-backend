import config from '../config';
//import database from './database';
import express from './express';
import Logger from './logger';
import Express from 'express';
import { connect } from 'mongoose'

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {

  await connect(config.databaseURL, {useNewUrlParser: true, useUnifiedTopology: true, ignoreUndefined: true })
  //await database();
  Logger.info(`✌️ Connection to database successful`);

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  Logger.info('✅ All modules loaded!');
};
