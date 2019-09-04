<template>
  <v-card tile>
    <v-toolbar flat>
      <Breadcrumb v-if="definition" :data="data" :definition="definition" />
      <v-spacer />
      <v-text-field
        v-model="query"
        style="max-width: 450px;"
        label="Suche ..."
        append-icon="mdi-magnify"
        @input="$emit('onQuery', query)"
        hide-details
        single-line/>
    </v-toolbar>
    <v-toolbar flat dense color="grey lighten-4">
      <v-toolbar-items>
        <template v-if="!$route.query.child">
          <v-btn text @click="NEW_ELEMENT" >
            <v-icon left small>mdi-plus-circle-outline</v-icon> Neu
          </v-btn>
          <v-btn text @click="EDIT_ELEMENT" :disabled="selected.length !== 1">
            <v-icon left small>mdi-pencil</v-icon> Bearbeiten
          </v-btn>
          <v-btn text @click="DESTROY_ELEMENTS" :disabled="selected.length === 0">
            <v-icon left small>mdi-delete</v-icon> Löschen
          </v-btn>
        </template>
        <template v-else>
          <v-btn text @click="ATTACH_ELEMENT">
            <v-icon left small>mdi-plus-circle-outline</v-icon> Hinzufügen
          </v-btn>
           <v-btn text @click="DETACH_ELEMENTS" :disabled="selected.length === 0">
            <v-icon left small>mdi-minus-circle-outline</v-icon> Entfernen
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items v-if="viewSingle">
        <v-btn
          text
          v-for="child in childs"
          :key="child.name"
          @click="SET_CHILD_MODEL(child)"
          :color="$route.query.child == child.modelName ? 'primary' : ''">
          <v-icon v-if="child.icon" left v-text="child.icon" small />
          {{ child.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :page="page"
      :items-per-page="limit"
      :server-items-length="total"
      :single-select="singleSelect"
      item-key="id"
      show-select
      @click:row="VIEW_ELEMENT"
      @update:items-per-page="UPDATE_LIMIT"
      @update:page="UPDATE_PAGE">
      <template v-slot:item.actions="{ item }">
        <v-btn x-small icon>
          <v-icon small color="primary">mdi-eye</v-icon>
        </v-btn>
        <v-btn x-small icon>
          <v-icon small color="light-blue accent-2">mdi-pencil</v-icon>
        </v-btn>
        <v-btn x-small icon>
          <v-icon small color="error">mdi-delete</v-icon>
        </v-btn>
        <span v-if="false">{{ item.actions }}</span>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="800" v-if="schema" persistent>
      <v-card tile>
        <v-toolbar dense tile flat color="grey lighten-4">
          <v-toolbar-title v-text="action"></v-toolbar-title>
        </v-toolbar>
        <v-card-text class="py-0">
          <v-container fluid>
            <v-form>
              <v-layout row wrap>
                <template v-if="actionType <= 4">
                <v-flex
                  v-show="value['type'] !== 'hidden'"
                  v-for="(value, key) in schema"
                  :key="key"
                  xs12>
                  <v-text-field :label="value['label']" :type="value['type']" v-model="value['value']" :readonly="actionType === 4" />
                </v-flex>
                </template>
                <template v-else>
                  <v-flex xs12>
                    <Lookup :definition="definition" @onSelected="SELECTED_ELEMENT" />
                  </v-flex>
                </template>
                <template v-if="actionType">
                  <v-flex xs12 class="text-right" v-if="actionType !== 4">
                    <v-btn @click="C_DIALOG" class="mr-2">Abbrechen</v-btn>
                    <v-btn @click="S_DIALOG" color="primary">Speichern</v-btn>
                  </v-flex>
                  <v-flex xs12 class="text-right" v-else>
                    <v-btn @click="EDIT_ELEMENT" class="mr-2">Bearbeiten</v-btn>
                    <v-btn @click="C_DIALOG" color="primary">Schliessen</v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    name: 'CoreTable',
    components: {
      Lookup: () => import("@/components/DataTable/Lookup"),
      Breadcrumb: () => import("@/components/DataTable/Breadcrumb")
    },
    computed: {
      viewSingle () {
        if (this.childs.length > 0 && this.$route.query.action === 'view') {
          return true
        }
      },
      childModel () {
        if (this.$route.query && this.$route.query.child) {
          return this.$route.query.child
        }
        return false
      },
      _page: {
        get: function () {
          return this.page
        },
        set: function (page) {
          this.$emit("onPageChange", page)
        }
      }
    },
    props: {
      definition: {
        type: Object,
        required: true,
        default: () => {}
      },
      data: {
        type: Object,
        default: () => {}
      },
      headers: {
        type: Array,
        required: true,
        default: () => null
      },
      items: {
        type: Array,
        required: true,
        default: () => []
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      },
      singleSelect: {
        type: Boolean,
        default: false
      },
      childs: {
        type: Array,
        default: () => []
      },
      _schema: {
        type: Object,
        default: () => null
      },
      newElementLink: {
        type: String,
      }
    },
    data: () => ({
      dialog: false,
      action: '',
      actionType: 0,
      query: '',
      selected: [],
      itemToAdd: null,
      schema: null
    }),
    methods: {
      NEW_ELEMENT () {
        this.action = 'Neuer Benutzer'
        this.actionType = 1
        this.schema = this._schema
        this.dialog = true
      },
      EDIT_ELEMENT () {
        this.action = 'Benutzer bearbeiten'
        this.actionType = 2
        this.schema = this._schema
        const selected = this.selected[0]
        this.schema.id = { value: selected.id, type: 'hidden' }
        Object.keys(this.schema).forEach(key => {
          this.schema[key]['value'] = selected[key]
        })
        this.dialog = true
      },
      VIEW_ELEMENT (item) {
        if (this.childModel) {
          const index = this.selected.findIndex(i => i.id === item.id)
          if (index > -1) {
            this.selected.splice(index, 1)
          } else {
            this.selected.push(item)
          }
        }
        else {
          if (this.childs.length !== 0) {
            this.$emit('onView', item)
          }
          else {
            this.action = 'Benutzer anzeigen'
            this.actionType = 4
            this.schema = this._schema
            this.selected.push(item)
            const selected = this.selected[0]
            this.schema.id = { value: selected.id, type: 'hidden' }
            Object.keys(this.schema).forEach(key => {
              this.schema[key]['value'] = selected[key]
            })
            this.dialog = true
          }
        }
      },
      DESTROY_ELEMENTS () {
        this.actionType = 3
        const payload = {
          idsToDestroy: this.selected.map(i => i.id)
        }

        this.$emit('onDestroy', { data: payload, actionType: this.actionType })
        this.selected = []
      },
      C_DIALOG () {
        // Close and Reset
        this.dialog = false
        this.action = ''
        this.actionType = 0
        this.selected = []
        Object.keys(this.schema).forEach(key => {
          this.schema[key]['value'] = ''
        })
      },
      S_DIALOG () {
        let payload = {}
        if (this.actionType === 5) {
          // payload.modelName = this.childModel
          payload.id = parseInt(this.$route.query.id)
          payload.attach = this.itemToAdd.map(i => i.id)
        }
        else {
          Object.keys(this.schema).forEach(key => {
            payload[key] = this.schema[key]['value']
          })
        }
        this.$emit('onSave', { data: payload, actionType: this.actionType })
        this.C_DIALOG()
      },
      UPDATE_LIMIT (limit) {
        this.$emit('onLimitChange', limit)
      },
      UPDATE_PAGE (page) {
        this.$emit("onPageChange", page)
      },
      ATTACH_ELEMENT () {
        const childModel = this.childModel
        if (childModel) {
          this.action = "Hinzufügen"
          this.schema = {}
          this.actionType = 5
          this.dialog = true
        }
      },
      DETACH_ELEMENTS () {
        const childModel = this.childModel
        if (childModel) {
          this.actionType = 6
          const payload = {
            id: parseInt(this.$route.query.id),
            detach: this.selected.map(i => i.id)
          }

          this.$emit('onDestroy', { data: payload, actionType: this.actionType })
          this.selected = []
        }
      },
      SELECTED_ELEMENT (selected) {
        this.itemToAdd = Array.isArray(selected) ? selected : [selected]
      },
      SET_CHILD_MODEL (child) {
        const currentRoute = this.$route
        this.$router.push({
          path: currentRoute.path,
          query: {
            ...currentRoute.query,
            child: child.modelName
          }
        })
      }
    }
  }
</script>
