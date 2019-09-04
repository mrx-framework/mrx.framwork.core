<template>
  <v-card v-if="data && definition" tile>
    <v-toolbar flat tag="div">
      <Breadcrumb v-if="definition" :data="data" :definition="definition" />
      <v-spacer />
      <v-text-field
        style="max-width: 450px;"
        :label="`${$t('common.search')} ...`"
        append-icon="mdi-magnify"
        hide-details
        @input="SET_QUERY"
        single-line
      />
    </v-toolbar>
    <v-card-text class="my-0 py-0">
      <p class="subtitle-2" v-if="definition">{{ $t(`descriptions.${definition.description}`) }}</p>
    </v-card-text>
    <v-toolbar flat dense color="grey lighten-4" tag="div">
      <v-toolbar-items>
        <template v-if="!$route.query.child">
          <v-btn text @click="NEW_ELEMENT" :disabled="disableNew">
            <v-icon left small>mdi-plus-circle-outline</v-icon> {{ $t('common.new') }}
          </v-btn>
          <v-btn text @click="EDIT_ELEMENT" :disabled="disableEdit || selected.length !== 1">
            <v-icon left small>mdi-pencil</v-icon> {{ $t('common.edit') }}
          </v-btn>
          <v-btn text @click="DESTROY_ELEMENTS" :disabled="disableDestroy || selected.length === 0">
            <v-icon left small>mdi-delete</v-icon> {{ $t('common.delete') }}
          </v-btn>
        </template>
        <template v-else>
          <template v-if="showChildActions">
            <v-btn text @click="NEW_ELEMENT" :disabled="disableNew">
              <v-icon left small>mdi-plus-circle-outline</v-icon> {{ $t('common.new') }}
            </v-btn>
            <v-btn text @click="EDIT_ELEMENT" :disabled="disableEdit || selected.length !== 1">
              <v-icon left small>mdi-pencil</v-icon> {{ $t('common.edit') }}
            </v-btn>
            <v-btn
              text
              @click="DESTROY_ELEMENTS"
              :disabled="disableDestroy || selected.length === 0"
            >
              <v-icon left small>mdi-delete</v-icon> {{ $t('common.edit') }}
            </v-btn>
          </template>
          <v-divider vertical v-if="showChildActions && !hideAttatchDetach" />
          <template v-if="!hideAttatchDetach">
            <v-btn text @click="ATTACH_ELEMENT">
              <v-icon left small>mdi-plus-circle-outline</v-icon> {{ $t('common.attach') }}
            </v-btn>
            <v-btn text @click="DETACH_ELEMENTS" :disabled="selected.length === 0">
              <v-icon left small>mdi-minus-circle-outline</v-icon> {{ $t('common.detach') }}
            </v-btn>
          </template>
        </template>
      </v-toolbar-items>
      <v-spacer />

      <v-toolbar-items v-if="childs">
        <v-btn
          text
          v-for="child in childs"
          :key="child.name"
          @click="SET_CHILD_MODEL(child)"
          :color="$route.query.child == child.modelName ? 'primary' : ''"
        >
          <v-icon v-if="child.icon" left v-text="child.icon" small />
          {{ child.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page.sync="limit"
      :server-items-length="total"
      show-select
      class="crud--table"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 15, 50]
      }"
    >
      <template v-slot:item="{ item, isSelected, select }">
        <tr @click="VIEW_ELEMENT(item)">
          <td class="text-start px-2 ma-0">
            <v-btn icon small class="pa-0 ma-0" @click.stop="select(!isSelected)">
              <v-icon v-if="isSelected">mdi-checkbox-marked</v-icon>
              <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
            </v-btn>
          </td>
          <td v-for="(header, index) in headers" :key="`${index}_${item[header.value]}`">
            <template v-if="header.type">
              <template v-if="header.type === 'Boolean'">
                <v-icon v-if="item[header.value]" class="success--text">mdi-check</v-icon>
                <v-icon v-else class="error--text">mdi-close</v-icon>
              </template>
            </template>
            <template v-else>{{ item[header.value] }}</template>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="800" v-if="schema" persistent>
      <v-card tile>
        <v-toolbar dense tile flat color="grey lighten-4">
          <v-toolbar-title v-text="dialogTitle"></v-toolbar-title>
        </v-toolbar>
        <v-card-text class="py-0">
          <v-container fluid>
            <v-form>
              <v-layout row wrap>
                <template v-if="actionType <= 4">
                  <v-flex
                    v-show="value['type'] !== 'hidden'"
                    v-for="(value, key, index) in schema"
                    :key="key"
                    xs12
                  >
                    <v-text-field
                      :label="$t(`labels.${value['label']}`)"
                      :type="value['type']"
                      v-model="value['value']"
                      :readonly="actionType === 4"
                      :autofocus="index === 0"
                    />
                  </v-flex>
                </template>
                <template v-else>
                  <v-flex xs12>
                    <Lookup :definition="definition" @onSelected="LOOKUP_COMPLETED" />
                  </v-flex>
                </template>
                <template v-if="actionType">
                  <v-flex xs12 class="text-right" v-if="actionType !== 4">
                    <v-btn @click="CLOSE_DIALOG" class="mr-2">Abbrechen</v-btn>
                    <v-btn @click="SAVE_ELEMENT" color="primary">Speichern</v-btn>
                  </v-flex>
                  <v-flex xs12 class="text-right" v-else>
                    <v-btn @click="CLOSE_DIALOG" class="mr-2">Schliessen</v-btn>
                    <v-btn @click="EDIT_ELEMENT" color="primary">Bearbeiten</v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="removeDialog" width="500" persistent>
      <v-card tile>
        <v-toolbar dense tile flat color="error" dark>
          <v-toolbar-title v-text="dialogTitle"></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <p class="subtitle-2" v-if="actionType === 3">
            Wollen Sie wirklich die ausgewählten
            {{ selected.length > 1 ? definition.title.plural : definition.title.singular }}
            {{ actionType === 3 ? "löschen" : "entfernen" }}
          </p>
          <p class="subtitle-2" v-if="actionType === 6">
            Wollen Sie wirklich die ausgewählten
            {{ selected.length > 1 ? definition.title.plural : definition.title.singular }}
            aus der {{ data.parent.definition.title.singular }}
            {{ actionType === 3 ? "löschen" : "entfernen" }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="CLOSE_DIALOG" class="mr-2">Nein</v-btn>
          <v-btn @click="REMOVE_ELEMENT" color="error">Ja</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { getDefinitionForQuery } from "@/api/apollo/definitions";
import { displayForm } from "@/api/apollo/queries";
import { debounce } from "lodash";
// import apolloCache from "./mixins/apollo-cache";

export default {
  name: "CRUD",
  // mixins: [apolloCache],
  components: {
    Lookup: () => import("@/components/CRUD/Lookup"),
    Breadcrumb: () => import("@/components/CRUD/Breadcrumb")
  },
  props: {
    modelName: {
      type: String,
      required: true
    },
    disableNew: {
      type: Boolean,
      default: false
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    disableDestroy: {
      type: Boolean,
      default: false
    },
    newElementAction: {
      type: String
    },
    viewElementAction: {
      type: String
    },
    refetchOnMount: {
      type: Boolean,
      default: false
    },
    showChildActions: {
      type: Boolean,
      default: false
    },
    hideAttatchDetach: {
      type: Boolean,
      default: false
    },
    useCacheHandler: {
      type: Boolean,
      default: true
    }
  },
  asyncComputed: {
    headers: {
      async get () {
        if (this.definition.name.singular === "formdata") {
          const { id } = this.$route.query
          const response = await this.$apollo.query({
            query: displayForm,
            variables: {
              id
            },
            fetchPolicy: "network-only"
          })
          const { data: { displayForm: { formfields }}} = response
          return formfields ?
            [
              ...formfields.map(field => ({
                text: field.label,
                align: "left",
                value: field.id
              })),
              { text: "Gesehen", align: "left", value: "seen", type: "Boolean" },
              { text: "Erstellt am", align: "left", value: "createdAt" }
            ]
            : []
        }
        else {
          return new Promise(resolve => {
            const headers = this.definition && this.definition.headers
              ? this.definition.headers.map(h => ({
                  ...h,
                  text: this.$t(`labels.${h.text}`)
                }))
              : [];
            resolve(headers)
          })
        }
      },
      default: []
    },
    items: {
      async get () {
        if (this.definition.name.singular === "formdata") {
          const { id } = this.$route.query
          const response = await this.$apollo.query({
            query: displayForm,
            variables: {
              id
            },
            fetchPolicy: "network-only"
          })

          const { data: { displayForm: { formdatas }}} = response
          console.log(formdatas)
          const formData = formdatas.map(form => ({
            ...JSON.parse(form.data),
            seen: form.seen,
            createdAt: this.$moment.unix(form.createdAt / 1000).format("LLL")
          }))
          return formData
        }
        else {
          return this.data && this.data.items && this.data.items.data
            ? this.data.items.data
            : [];
        }
      },
      default: []
    },
  },
  computed: {
    isChildModel() {
      return !!(this.$route.query && this.$route.query.child);
    },
    childModel() {
      if (!this.$route.query.child) return false;
      return this.$route.query.child;
    },
    definition() {
      const model = this.childModel || this.modelName;
      return getDefinitionForQuery(model);
    },
    mainDefinition() {
      return getDefinitionForQuery(this.modelName);
    },
    total() {
      return this.data && this.data.items ? this.data.items.total : 0;
    },
    childs() {
      if (
        this.isChildModel &&
        this.data &&
        this.data.parent &&
        this.data.parent.definition
      ) {
        return this.data.parent.definition.childs;
      }
    },
    child() {
      if (
        this.isChildModel &&
        this.data &&
        this.data.parent &&
        this.data.parent.definition
      ) {
        this.data.parent.definition.childs[this.childModel];
      }
      return null;
    }
  },
  apollo: {
    data: {
      query() {
        return this.isChildModel
          ? this.mainDefinition.handlers.getItem
          : this.mainDefinition.handlers.getList;
      },
      variables() {
        return this.isChildModel
          ? {
              id: parseInt(this.$route.query.id),
              page: this.page,
              limit: this.limit,
              query: this.query
            }
          : {
              page: this.page,
              limit: this.limit,
              query: this.query
            };
      },
      update(response) {
        if (!Object.keys(response).length) return null;
        try {
          const currentDefinition = this.definition;
          let data;
          if (this.isChildModel) {
            const parentDefinition = getDefinitionForQuery(this.modelName);
            data = {
              parent: {
                definition: parentDefinition,
                data: response[parentDefinition.name.singular]
              },
              items:
                response[parentDefinition.name.singular][
                  currentDefinition.name.plural
                ]
            };
          } else {
            data = {
              items: response[currentDefinition.name.plural]
            };
          }
          return data;
        } catch (error) {
          this.onError(error, "APOLLO DATA UPDATE");
        }
      },
      result(result) {
        if ("partial" in result) {
          console.log("from server?");
          const { partial } = result;
          if (partial) {
            console.log("HERE WE HAVE PARITAL RESULT ?! wtf is that");
          }
        } else {
          console.log("from cache?");
          const { stale } = result;
          if (stale) {
            // debugger
            console.log("HERE WE HAVE STALE RESULT ?! wtf is that");
          }
        }
        return result;
      },
      error(error) {
        return this.onError(error, "APOLLO DATA RESULT");
      }
    }
  },
  data: () => ({
    data: null,
    page: 1,
    limit: 10,
    query: null,
    selected: [],
    actionType: 0,
    schema: null,
    dialog: false,
    dialogTitle: "",
    removeDialog: false,
    lookupItems: []
  }),
  methods: {
    async SAVE_ELEMENT() {
      let payload;
      // BUILD PAYLOAD OBJECT
      if (this.actionType === 5) {
        payload = {
          data: {
            id: parseInt(this.$route.query.id),
            attach: this.lookupItems.map(s => s.id)
          },
          actionType: this.actionType
        };
      } else {
        let _d = {};
        Object.keys(this.schema).forEach(key => {
          _d[key] = this.schema[key]["value"];
        });

        payload = {
          data: _d,
          actionType: this.actionType
        };
      }

      const _self = this;
      const { data, actionType } = payload;
      const definition = this.definition;

      let mutation, currentModelName, variables, currentQueryVariables;

      switch (actionType) {
        case 1: {
          // GET MUTATION FOR CREATE DATA AND SET VARIABLES
          mutation = definition.handlers.createItem;
          variables = data;
          currentQueryVariables = {
              page: this.page,
              limit: this.limit,
              query: this.query ? this.query : null
            }
          break
        }
        case 2: {
          // GET MUTATION FOR UPDATE DATA AND SET VARIABLES
          mutation = definition.handlers.updateItem;
          variables = data;
          currentQueryVariables = {
            page: this.page,
            limit: this.limit,
            query: this.query ? this.query : null
          };
          break;
        }
        case 5: {
          // GET MUTATION FOR ATTACH ITEM
          const { parent } = this.data;
          mutation = parent.definition.attach[this.childModel];
          variables = data;
          currentQueryVariables = {
            id: parent.data.id,
            page: this.page,
            limit: this.limit,
            query: this.query ? this.query : null
          };
          break;
        }
        default: {
          return console.log("NO DEFINED ACTION TYPE");
        }
      }

      try {
        await this.$apollo.mutate({
          mutation,
          variables,
          update(proxy, { data }) {
            if (_self.useCacheHandler) {
              _self.cacheHandler({
                actionType,
                proxy,
                data,
                currentQueryVariables
              });
            } else {
              _self.$apollo.queries.data.refetch()
            }
            _self.CLOSE_DIALOG();
          },
          error(error) {
            _self.onError(error, "APOLLO MUTATE SAVE");
          }
        });
      } catch (error) {
        _self.onError(error, "SAVE ELEMENT");
      }
    },
    async REMOVE_ELEMENT() {
      let payload;
      // BUILD PAYLOAD OBJECT
      if (this.actionType === 6) {
        payload = {
          data: {
            id: parseInt(this.$route.query.id),
            detach: this.selected.map(s => s.id)
          },
          actionType: this.actionType
        };
      } else {
        payload = {
          data: {
            ids: this.selected.map(i => i.id)
          },
          actionType: this.actionType
        };
      }

      const _self = this;
      const { data, actionType } = payload;
      const definition = this.definition;

      let mutation, currentModelName, variables, currentQueryVariables;

      switch (actionType) {
        case 3: {
          // GET MUTATION FOR DESTROY DATA AND SET VARIABLES
          mutation = definition.handlers.destroyItem;
          variables = {
            ids: data.ids
          };
          currentQueryVariables = {
            page: this.page,
            limit: this.limit,
            query: this.query
          };
          break;
        }
        case 6: {
          // GET MUTATION FOR DETACH ITEM
          const { parent } = this.data;
          mutation = parent.definition.detach[this.childModel];
          variables = data;
          currentQueryVariables = {
            id: parent.data.id,
            page: this.page,
            limit: this.limit,
            query: this.query ? this.query : null
          };
          break;
        }
        default: {
          return console.log("NO DEFINED ACTION TYPE");
        }
      }

      try {
        await this.$apollo.mutate({
          mutation,
          variables,
          update(proxy, { data }) {
            if (_self.useCacheHandler) {
              _self.cacheHandler({
                actionType,
                proxy,
                data,
                currentQueryVariables
              });
            }
            else {
              _self.$apollo.queries.data.refetch()
            }
            _self.CLOSE_DIALOG();
          },
          error(error) {
            _self.onError(error, "APOLLO MUTATE DELETE");
          }
        });
      } catch (error) {
        _self.onError(error, "DESTROY ELEMENT");
      }
    },
    NEW_ELEMENT() {
      if (this.newElementAction) {
        return this.$router.push(this.newElementAction);
      }
      if (this.definition) {
        this.actionType = 1;
        this.schema = this.definition.schema;

        if (this.isChildModel) {
          const association = this.mainDefinition.childs.find(
            child => child.modelName === this.childModel
          );
          const { associationType } = association;

          switch (associationType) {
            case "hasMany":
              this.schema[`${this.mainDefinition.name.singular}Id`] = {
                type: "hidden",
                label: "Association",
                value: this.$route.query.id
              };
              break;
          }
        }
        this.dialogTitle = `${this.definition.title.singular} erstellen`;
        this.dialog = true;
      }
    },
    EDIT_ELEMENT() {
      if (this.definition) {
        let selected;

        this.schema = this.definition.schema;
        selected = this.selected[0];

        this.actionType = 2;
        this.schema.id = { value: selected.id, type: "hidden" };
        Object.keys(this.schema).forEach(key => {
          this.schema[key]["value"] = selected[key];
        });
        this.dialogTitle = `${this.definition.title.singular} bearbeiten`;
        this.dialog = true;
      }
    },
    DESTROY_ELEMENTS() {
      if (this.definition) {
        this.actionType = 3;
        this.schema = {};
        this.dialogTitle = `${
          this.selected.length > 1
            ? this.definition.title.plural
            : this.definition.title.singular
        } löschen`;
        this.removeDialog = true;
      }
    },
    VIEW_ELEMENT(item, force = false) {
      if (this.viewElementAction) {
        const path = this.RESOLVE_URL_PARAMS(this.viewElementAction, item);
        return this.$router.push(path);
      }
      if (this.isChildModel) {
        if (force) {
          const { schema } = this.data.parent.definition;
          this.actionType = 4;
          this.schema = schema;
          //this.selected.push(this.data.parent.data)
          const selected = this.data.parent.data;
          this.schema.id = { value: selected.id, type: "hidden" };
          Object.keys(this.schema).forEach(key => {
            this.schema[key]["value"] = selected[key];
          });
          this.dialogTitle = `${this.data.parent.definition.title.singular} anzeigen`;
          this.dialog = true;
        } else {
          const index = this.selected.findIndex(i => i.id === item.id);
          if (index > -1) {
            this.selected.splice(index, 1);
          } else {
            this.selected.push(item);
          }
        }
      } else {
        const { childs } = this.definition;
        if (childs && childs.length !== 0) {
          const currentRoute = this.$route;

          this.$router.push({
            path: currentRoute.path,
            query: {
              id: item.id,
              child: childs[0].modelName
            }
          });
        } else {
          const { schema } = this.definition;
          this.actionType = 4;
          this.schema = schema;
          this.selected.push(item);
          const selected = this.selected[0];
          this.schema.id = { value: selected.id, type: "hidden" };
          Object.keys(this.schema).forEach(key => {
            this.schema[key]["value"] = selected[key];
          });
          this.dialogTitle = `${this.definition.title.singular} anzeigen`;
          this.dialog = true;
        }
      }
    },
    ATTACH_ELEMENT() {
      if (this.isChildModel) {
        this.schema = {};
        this.actionType = 5;
        this.dialogTitle = `${this.definition.title.singular} hinzufügen`;
        this.dialog = true;
      }
    },
    DETACH_ELEMENTS() {
      if (this.isChildModel) {
        const childModel = this.childModel;
        this.actionType = 6;
        this.dialogTitle = `${
          this.selected.length > 1
            ? this.definition.title.plural
            : this.definition.title.singular
        } entfernen`;
        this.removeDialog = true;
      }
    },
    LOOKUP_COMPLETED(lookup) {
      this.lookupItems = Array.isArray(lookup) ? lookup : [lookup];
    },
    CLOSE_DIALOG() {
      // Close and Reset
      this.dialog = false;
      this.removeDialog = false;
      this.actionType = 0;
      this.selected = [];
      Object.keys(this.schema).forEach(key => {
        this.schema[key]["value"] = "";
      });
    },
    SET_CHILD_MODEL(child) {
      if (this.isChildModel) {
        const { modelName } = child;
        const currentPath = this.$route.path;
        const currentQueries = this.$route.query;
        this.$router.push({
          path: currentPath,
          query: {
            ...currentQueries,
            child: modelName
          }
        });
      }
    },
    SET_QUERY: debounce(function(value) {
      this.page = 1;
      this.query = value;
    }, 200),
    RESOLVE_URL_PARAMS(url, item) {
      const path = url.split("?")[0];
      const queries = url.split("?")[1];

      let params = [];
      for (let i = 0; i < path.split("/").length; i++) {
        let param = path.split("/")[i];
        if (param.substr(0, 1) === ":") {
          param = param.slice(1);
          params.push(item[param]);
        } else {
          params.push(param);
        }
      }

      let _queries = [];
      for (let i = 0; i < queries.split("&").length; i++) {
        const query = queries.split("&")[i].split("=")[0];
        let param = queries.split("&")[i].split("=")[1];

        if (param.substr(0, 1) === ":") {
          param = param.slice(1);
        }
        _queries.push(`${query}=${item[param]}`);
      }

      return `${params.join("/")}?${_queries.join("")}`;
    },
    cacheHandler(args) {
      const { actionType, proxy, data, currentQueryVariables } = args;
      switch (actionType) {
        case 1: {
          this.addToCache(proxy, data, currentQueryVariables);
          break;
        }
        case 2: {
          this.updateCache(proxy, data, currentQueryVariables);
          break;
        }
        case 3: {
          this.removeFromCache(proxy, data, currentQueryVariables);
          break;
        }
        case 5: {
          this.attachToCache(proxy, data, currentQueryVariables);
          break;
        }
        case 6: {
          this.detachFromCache(proxy, data, currentQueryVariables);
          break;
        }
      }
    },
    addToCache(proxy, data, currentQueryVariables) {
      const definition = this.definition;
      const { getList, createItem } = definition.handlers;
      const createMethod = createItem.definitions[0].name.value;

      if (createMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getList,
            variables: currentQueryVariables
          });
          // ADD ITEM TO CACHE
          cache[definition.name.plural].data.push(data[createMethod])
          cache[definition.name.plural].total++


          // WRITE CACHE
          proxy.writeQuery({
            query: getList,
            variables: currentQueryVariables,
            data: cache
          });
        } catch (error) {
          this.onError(error, "ADD TO CACHE");
        }
      }
    },
    removeFromCache(proxy, data, currentQueryVariables) {
      const definition = this.definition;
      const { getList, destroyItem } = definition.handlers;
      const destroyMethod = destroyItem.definitions[0].name.value;

      if (destroyMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getList,
            variables: currentQueryVariables
          });

          for (let i = 0; i < data[destroyMethod].length; i++) {
            let item = data[destroyMethod][i];
            const index = cache[definition.name.plural].data.findIndex(
              u => u.id === item.id
            );
            if (index > -1) {
              cache[definition.name.plural].data.splice(index, 1);
              proxy.data.delete(`${item.__typename}:${item.id}`);
              cache[definition.name.plural].data.total--;
            }
          }

          // WRITE CACHE
          proxy.writeQuery({
            query: getList,
            variables: currentQueryVariables,
            data: cache
          });
        } catch (error) {
          this.onError(error, "REMOVE FROM CACHE");
        }
      }
    },
    updateCache(proxy, data) {
      console.log(proxy, data);
    },
    attachToCache(proxy, data, currentQueryVariables) {
      const definition = this.definition;
      const parentDefinition = this.data.parent.definition;
      const { getItem } = parentDefinition.handlers;
      const attachMethod =
        parentDefinition.attach[definition.name.plural].definitions[0].name
          .value;

      if (attachMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getItem,
            variables: currentQueryVariables
          });

          // ATTATCH TO CACHE
          let dataStore =
            cache[parentDefinition.name.singular][definition.name.plural].data;
          data[attachMethod].forEach(newItem => {
            const _alreadyExists = dataStore.findIndex(
              d => d.id === newItem.id
            );
            if (_alreadyExists === -1) {
              dataStore.push(newItem);
              cache[parentDefinition.name.singular][definition.name.plural]
                .total++;
            } else {
              console.log("ALREADY IN CACHE");
            }
          });

          // WRITE TO CACHE
          proxy.writeQuery({
            query: getItem,
            variables: currentQueryVariables,
            data: cache
          });
        } catch (error) {
          this.onError(error, "ATTACH TO CACHE");
        }
      }
    },
    detachFromCache(proxy, data, currentQueryVariables) {
      const definition = this.definition;
      const parentDefinition = this.data.parent.definition;
      const { getItem } = parentDefinition.handlers;
      const detachMethod =
        parentDefinition.detach[definition.name.plural].definitions[0].name
          .value;

      if (detachMethod) {
        try {
          // GET DATA IN CACHE
          const cache = proxy.readQuery({
            query: getItem,
            variables: currentQueryVariables
          });

          // DETACH FROM CACHE
          let dataStore =
            cache[parentDefinition.name.singular][definition.name.plural].data;
          data[detachMethod].forEach(newItem => {
            const _alreadyExists = dataStore.findIndex(
              d => d.id === newItem.id
            );
            if (_alreadyExists > -1) {
              dataStore.splice(_alreadyExists, 1);
              cache[parentDefinition.name.singular][definition.name.plural]
                .total--;
            } else {
              console.log("CANT FIND IN CACHE");
            }
          });

          // WRITE TO CACHE
          proxy.writeQuery({
            query: getItem,
            variables: currentQueryVariables,
            data: cache
          });
        } catch (error) {
          this.onError(error, "DETACH FROM CACHE");
        }
      }
    },
    onError(error, source) {
      console.log("ERROR IN SOURCE: ", source);
      if (error.graphQLErrors && error.graphQLErrors.length !== 0) {
        console.error(
          `GraphQL execution errors for ${this.type} '${this.key}'`
        );
        for (let e of error.graphQLErrors) {
          console.error(e);
        }
      } else if (error.networkError) {
        console.error(
          `Error sending the ${this.type} '${this.key}'`,
          error.networkError
        );
      } else {
        console.error(
          `[vue-apollo] An error has occured for ${this.type} '${this.key}'`
        );
        if (Array.isArray(error)) {
          console.error(...error);
        } else {
          console.error(error);
        }
      }
    }
  },
  mounted() {
    if (this.refetchOnMount) {
      this.$apollo.queries.data.refetch();
    }
  }
};
</script>

