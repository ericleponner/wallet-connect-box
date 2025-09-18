<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script setup lang="ts">

import {computed, ref} from "vue"
import {connect, CONNECT_PARAMS, ConnectInfo, disconnect, PROJECT_ID, SIGN_OPTIONS} from "@/tools.ts"

const connectInfo = ref<ConnectInfo|null>(null)
const busy = ref<boolean>(false)
const error = ref<unknown>(null)

const buttonTitle = computed(() => {
  return connectInfo.value !== null ? "Disconnect from WallectConnect" : "Connect to WalletConnect"
})

const state = computed(() => {
  return connectInfo.value !== null ? "Connected" : "Disconnected"
})

const handleClick = async () => {
    busy.value = true
    try {
      if (connectInfo.value !== null) {
        await disconnect(connectInfo.value as ConnectInfo)
        connectInfo.value = null
      } else {
        connectInfo.value = await connect()
      }
    } catch(reason) {
      error.value = reason
    } finally {
      busy.value = false
    }
}


</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                     TEMPLATE                                                    -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<template>
  <h1>Wallet Connect Box</h1>
  <template v-if="PROJECT_ID === 'YOUR_PROJECT_ID'">
    <div>Edit <code>src/tools.ts</code> and sets <code>PROJECT_ID</code> with your Wallet Connect project ID</div>
  </template>
  <template v-else>
    <div>
      <div class="with-margin">State: {{ state }}</div>
      <button class="with-margin" @click="handleClick" :disabled="busy">{{ buttonTitle }}</button>
    </div>
    <hr/>
    <h3>CONNECTION INPUTS</h3>
    <div class="with-margin">
      <div>PROJECT_ID</div>
      <pre>{{ PROJECT_ID }}</pre>
      <div>SIGN_OPTIONS</div>
      <pre>{{ JSON.stringify(SIGN_OPTIONS, null, 2) }}</pre>
      <div>CONNECT_PARAMS</div>
      <pre>{{ JSON.stringify(CONNECT_PARAMS, null, 2) }}</pre>
    </div>
    <div v-if="connectInfo !== null">
      <hr/>
      <h3>SESSION</h3>
      <pre>{{ JSON.stringify(connectInfo.session, null, 2) }}</pre>
    </div>
  </template>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      STYLE                                                      -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style scoped>
.with-margin {
  margin-bottom: 10px
}
</style>
