/* @flow */
/*
import {
  paginationToParams,
  dataToConnection
} from "graphql-dynamodb-connections";
*/
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import addEvent from "../resolvers/events/create";
import viewEvent from "../resolvers/events/view";
import listEvents from "../resolvers/events/list";
import removeEvent from "../resolvers/events/remove";

const eventType = new GraphQLObjectType({
  name: "Event",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    addedAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      listEvents: {
        type: new GraphQLList(eventType),
        resolve: (/*parent, args*/) => {
          return listEvents();
        },
      },
      viewEvent: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: eventType,
        resolve: (/*parent,*/ args: { id: string }) => {
          return viewEvent(args.id);
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createEvent: {
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          quantity: { type: new GraphQLNonNull(GraphQLInt) },
        },
        type: eventType,
        resolve: (/*parent, */ args) => {
          return addEvent(args);
        },
      },
      removeProduct: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) },
        },
        type: GraphQLBoolean,
        resolve: (/*parent,*/ args: { id: string }) => {
          return removeEvent(args.id);
        },
      },
    },
  }),
});
export default schema;