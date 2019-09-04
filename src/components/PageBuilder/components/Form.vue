<template>
  <v-form :lazy-validation="lazyValidation">
    <template v-if="id <= 0">Please choose form</template>
    <template v-if="id > 0 && form">
      <v-container fluid v-if="form.formfields.length > 0">
        <template v-if="!success">
          <h2 class="title" v-if="showTitle">{{ form.name }}</h2>
          <v-row>
            <v-col cols="12" v-for="field in form.formfields" :key="field.id">
              <v-text-field
                v-model="model[field.id]"
                :type="field.inputType"
                :label="field.label"
                :hint="field.hint"
                :hide-details="!field.hint"
              />
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" @click="SAVE_FORM">{{ buttonText }}</v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <div class="text-center pt-5">
            <h2 class="accent--text text--lighten-1 text-uppercase">{{ $t("common.thanks") }}</h2>
            <h3 class="accent--text text--lighten-1 text-uppercase mb-3">{{ $t("common.response_soon") }}</h3>
            <v-btn text small @click="CLOSE_THANKS">{{ $t("common.go_back") }}</v-btn>
          </div>
        </template>
      </v-container>
    </template>
  </v-form>
</template>

<script>
import { displayForm } from "@/api/apollo/queries";
import { createFormData } from "@/api/apollo/mutations";

export default {
  name: "Form",
  props: {
    formObject: {
      type: Object
    },
    "show-title": {
      type: Boolean,
      default: true
    },
    "button-text": {
      type: String,
      default: "Absenden"
    },
    "lazy-validation": {
      type: Boolean,
      default: false
    }
  },
  computed: {
    id() {
      return this.formObject && this.formObject.id > -1
        ? this.formObject.id
        : -1;
    }
  },
  apollo: {
    form: {
      query: displayForm,
      variables() {
        return { id: this.id };
      },
      update: ({ displayForm }) => displayForm,
      skip() {
        return this.id <= 0;
      }
    }
  },
  watch: {
    id (id) {
      if (id > 0) {
        this.$apollo.queries.form.refetch();
      }
    },
    form: {
      handler (data) {
        if (data) {
          const { formfields } = data
          formfields.forEach(field => {
            this.$set(this.model, field.id, "")
          })
        }
      },
      immediate: true
    }
  },
  data: () => ({
    form: null,
    model: {},
    success: false
  }),
  methods: {
    SAVE_FORM() {
      const payload = {
        data: JSON.stringify(this.model),
        formId: this.id
      }
      const _self = this
      this.$apollo.mutate({
        mutation: createFormData,
        variables: payload,
        update (proxy, { createFormData }) {
          _self.success = true
        }
      })
    },
    CLOSE_THANKS () {
      Object.keys(this.model).forEach(key => {
        this.model[key] = ""
      });
      this.success = false
    }
  }
};
</script>
