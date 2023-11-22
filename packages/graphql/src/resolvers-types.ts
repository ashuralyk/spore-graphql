import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Cell = {
  __typename?: 'Cell';
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNumber?: Maybe<Scalars['String']['output']>;
  cellOutput: CellOutput;
  data: Scalars['String']['output'];
  outPoint?: Maybe<OutPoint>;
  txIndex?: Maybe<Scalars['String']['output']>;
};

export type CellOutput = {
  __typename?: 'CellOutput';
  capacity: Scalars['String']['output'];
  lock: Script;
  type?: Maybe<Script>;
};

export type Cluster = {
  __typename?: 'Cluster';
  cell?: Maybe<Cell>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  spores?: Maybe<Array<Maybe<Spore>>>;
};

export enum HashType {
  Data = 'data',
  Data1 = 'data1',
  Type = 'type'
}

export type OutPoint = {
  __typename?: 'OutPoint';
  index: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cluster?: Maybe<Cluster>;
  clusterCount: Scalars['Int']['output'];
  clusters?: Maybe<Array<Maybe<Cluster>>>;
  spore?: Maybe<Spore>;
  sporeCount: Scalars['Int']['output'];
  spores?: Maybe<Array<Maybe<Spore>>>;
  topClusters?: Maybe<Array<Maybe<Cluster>>>;
};


export type QueryClusterArgs = {
  id: Scalars['String']['input'];
};


export type QueryClustersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<QueryOrder>;
};


export type QuerySporeArgs = {
  id: Scalars['String']['input'];
};


export type QuerySporeCountArgs = {
  filter?: InputMaybe<SporesFilterInput>;
};


export type QuerySporesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SporesFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<QueryOrder>;
};


export type QueryTopClustersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
};

export enum QueryOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Script = {
  __typename?: 'Script';
  args: Scalars['String']['output'];
  codeHash: Scalars['String']['output'];
  hashType: HashType;
};

export type Spore = {
  __typename?: 'Spore';
  cell?: Maybe<Cell>;
  cluster?: Maybe<Cluster>;
  clusterId?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type SporesFilterInput = {
  clusterId?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cell: ResolverTypeWrapper<Cell>;
  CellOutput: ResolverTypeWrapper<CellOutput>;
  Cluster: ResolverTypeWrapper<Cluster>;
  HashType: HashType;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  OutPoint: ResolverTypeWrapper<OutPoint>;
  Query: ResolverTypeWrapper<{}>;
  QueryOrder: QueryOrder;
  Script: ResolverTypeWrapper<Script>;
  Spore: ResolverTypeWrapper<Spore>;
  SporesFilterInput: SporesFilterInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Cell: Cell;
  CellOutput: CellOutput;
  Cluster: Cluster;
  Int: Scalars['Int']['output'];
  OutPoint: OutPoint;
  Query: {};
  Script: Script;
  Spore: Spore;
  SporesFilterInput: SporesFilterInput;
  String: Scalars['String']['output'];
}>;

export type CellResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cell'] = ResolversParentTypes['Cell']> = ResolversObject<{
  blockHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blockNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cellOutput?: Resolver<ResolversTypes['CellOutput'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outPoint?: Resolver<Maybe<ResolversTypes['OutPoint']>, ParentType, ContextType>;
  txIndex?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CellOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellOutput'] = ResolversParentTypes['CellOutput']> = ResolversObject<{
  capacity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lock?: Resolver<ResolversTypes['Script'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['Script']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClusterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cluster'] = ResolversParentTypes['Cluster']> = ResolversObject<{
  cell?: Resolver<Maybe<ResolversTypes['Cell']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  spores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Spore']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OutPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['OutPoint'] = ResolversParentTypes['OutPoint']> = ResolversObject<{
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cluster?: Resolver<Maybe<ResolversTypes['Cluster']>, ParentType, ContextType, RequireFields<QueryClusterArgs, 'id'>>;
  clusterCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  clusters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cluster']>>>, ParentType, ContextType, RequireFields<QueryClustersArgs, 'first'>>;
  spore?: Resolver<Maybe<ResolversTypes['Spore']>, ParentType, ContextType, RequireFields<QuerySporeArgs, 'id'>>;
  sporeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QuerySporeCountArgs>>;
  spores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Spore']>>>, ParentType, ContextType, RequireFields<QuerySporesArgs, 'first'>>;
  topClusters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cluster']>>>, ParentType, ContextType, Partial<QueryTopClustersArgs>>;
}>;

export type ScriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Script'] = ResolversParentTypes['Script']> = ResolversObject<{
  args?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  codeHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hashType?: Resolver<ResolversTypes['HashType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SporeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Spore'] = ResolversParentTypes['Spore']> = ResolversObject<{
  cell?: Resolver<Maybe<ResolversTypes['Cell']>, ParentType, ContextType>;
  cluster?: Resolver<Maybe<ResolversTypes['Cluster']>, ParentType, ContextType>;
  clusterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Cell?: CellResolvers<ContextType>;
  CellOutput?: CellOutputResolvers<ContextType>;
  Cluster?: ClusterResolvers<ContextType>;
  OutPoint?: OutPointResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Script?: ScriptResolvers<ContextType>;
  Spore?: SporeResolvers<ContextType>;
}>;
