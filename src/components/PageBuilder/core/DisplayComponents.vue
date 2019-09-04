<template>
  <component :is="name" v-bind="componentProperties" @click.stop="SELECT_COMPONENT">
    <template v-if="name === 'v-text'">
      <span class="text--content--wrapper" v-bind="componentProperties" v-text="content" @click.stop="SELECT_COMPONENT"/>
    </template>
    <template v-if="name === 'v-text-section'">
      <div class="html--content--wrapper" v-bind="componentProperties" v-html="content" @click.stop="SELECT_COMPONENT"/>
    </template>

    <Recursive
      v-for="child in childs"
      :key="child.id"
      :title="child.title"
      :name="child.name"
      :id="child.id"
      :properties="child.properties"
      :childs="child.childs"
      :content="child.content"
      :editMode="editMode"
    ></Recursive>
  </component>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "DisplayComponents",
  components: {
    Recursive: () => import("./DisplayComponents"),
    "v-text": () => import("../components/DynamicText"),
    "v-text-section": () => import("../components/DynamicTextSection"),
    "mrx-form": () => import("../components/Form")
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String
    },
    properties: {
      type: String
    },
    childs: {
      type: Array,
      default: () => []
    },
    content: {
      type: String
    }
  },
  computed: {
    ...mapState("builder", ["selectedComponentId"]),
    componentProperties() {
      const props = JSON.parse(this.properties);
      const classes = props.class ? props.class.split(" ") : [];
      //const styles = props.style ? props.style.split(";") : []
      if (this.editMode) {
        classes.push("builder--edit--mode");
      }
      if (this.selectedComponentId === this.currentComponent.id) {
        classes.push("builder--active--component");
      }
      props.class = classes;
      return props;
    },
    currentComponent () {
      return {
        id: this.id,
        name: this.name,
        title: this.title,
        properties: this.properties,
        childs: this.childs,
        content: this.content
      }
    }
  },
  methods: {
    SELECT_COMPONENT() {
      if (!this.editMode) return;
      const breadCrump = {
        active: this.currentComponent
      }

      this.$store.dispatch("builder/CHANGE_SELECTED_COMPONENT_ID", this.id);
    }
  }
};
</script>

<style lang="scss">
.container.builder--edit--mode {
  min-height: 80px;
  &:hover {
    background: #f1f1f1;
  }
  &.builder--active--component {
    border: 1px dotted #ababab;
  }
}
.row.builder--edit--mode {
  min-height: 80px;
  padding: 10px 0;
  &:hover{
    background: #dedede;
  }
  &.builder--active--component {
    border: 1px dotted #ababab;
  }
}
.col.builder--edit--mode {
  min-height: 80px;
  &:hover{
    background: #eaeaea;
  }
  &.builder--active--component {
    border: 1px dotted #ababab;
  }
}

.html--content--wrapper.builder--edit--mode,
.text--content--wrapper.builder--edit--mode {
  &:hover{
    background: #dce7ff;
  }
  &.builder--active--component {
    border: 1px dotted #ababab;
  }
}

.v-image.builder--edit--mode {
  &:hover{
    background: #dcffee;
  }
  &.builder--active--component {
    border: 1px dotted #ababab;
  }
}

.v-card.builder--edit--mode {
  &:hover{
    background: #fff7f1 !important;
  }
  &.builder--active--component {
    border: 1px dotted #ababab !important;
  }
}

.builder--edit--mode {
  cursor: pointer;
}
</style>
