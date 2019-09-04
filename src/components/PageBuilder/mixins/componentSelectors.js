export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
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
  methods: {
    SELECT_COMPONENT () {
      if (!this.editMode) return

      const breadCrump = {
        active: {
          id: this.id,
          name: this.name,
          title: this.title,
        }
      }
      this.$store.dispatch("builder/CHANGE_SELECTED_COMPONENT_ID", this.id)
      this.$store.dispatch("builder/BUILD_BREADCRUMB", breadCrump)
      this.$emit("onChildSelected", breadCrump)
    },
    ON_CHILD_SELECTED (childComponent) {
      childComponent.siblings = this.childs
                                      .filter(c => c.id !== childComponent.active.id)
                                      .map(p => ({ id: p.id, name: p.name, title: p.title }))
      const breadCrump = {
        active: {
          id: this.id,
          name: this.name,
          title: this.title,
        },
        child: childComponent
      }
      this.$store.dispatch("builder/BUILD_BREADCRUMB", breadCrump)
      this.$emit("onChildSelected", breadCrump)

    }
  }
}
