<template>
  <div class="flex-grow-[1] flex flex-row items-center" :class="collapse?'justify-center':''">
    <template v-if="icon">
      <i v-if="icon.includes('el-icon')" :class="[icon, 'sub-el-icon']" />
      <svg-icon v-else :icon-class="icon" style="margin: 0" />
    </template>
    <span v-if="!collapse && title" style="margin-left: 15px">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
    }
  }
  // render(h, context) {
  //   const { icon, title } = context.props
  //   const vnodes = []

  //   if (icon) {
  //     if (icon.includes('el-icon')) {
  //       vnodes.push(<i class={[icon, 'sub-el-icon']} />)
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon}/>)
  //     }
  //   }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
