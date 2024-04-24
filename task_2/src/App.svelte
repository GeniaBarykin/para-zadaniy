<script lang="ts">
  import { onMount} from 'svelte'
  import { getConversionRates } from './utils/GetConversionRates';

  let conversion_rates = {}
  let drop_down_1_visible = false
  let drop_down_2_visible = false
  let currency_1 = 'USD'
  let currency_2 = 'USD'
  let error_message = ""
  let value1 = 0
  let value2 = 0

  $: rate1 = conversion_rates[currency_1]
  $: rate2 = conversion_rates[currency_2]
  
  const changeVal1 = (value2,rate1,rate2) =>{
    value1 = value2*rate1/rate2
  }

  const changeVal2 = (value1,rate1,rate2) =>{
    value2 = value1*rate2/rate1
  }

  $: changeVal1(value2,rate1,rate2)
  $: changeVal2(value1,rate1,rate2)

  onMount(()=>{
    getConversionRates().then((result => {
        if(result.ok){result.json().then((data) =>{
          conversion_rates = data.conversion_rates          
          value1 = 0          
          value2 = 0
        })} else {
          error_message="Failed to fetch data"
        }               
    }))
  })
</script>

<main>
<div class="main-wrap">
  <div class="currency-wrap-1">
    <button on:click={() => {drop_down_1_visible=!drop_down_1_visible}}>{currency_1}</button>
    {#if drop_down_1_visible}  
    <form class= currency-form>
      {#each Object.keys(conversion_rates) as child}
        <div class="radio-wrap">
          <input type="radio" name="currency" value={{child}} on:change={() => {
            currency_1=child
            }}>
          {child}
        </div>
      {/each}
    </form>
    {/if}
  </div>  
  <input bind:value={value1} >
  <input bind:value={value2}>
  <div class="currency-wrap-2">
    <button on:click={() => {
      drop_down_2_visible=!drop_down_2_visible

      }}>{currency_2}</button>
    {#if drop_down_2_visible}  
    <form class="currency-form">
      {#each Object.keys(conversion_rates) as child}
        <div class="radio-wrap">
          <input type="radio" name="currency" value={{child}} on:change={() => {
            currency_2=child
            }}>
          {child}
        </div>
      {/each}
    </form>
    {/if}
  </div>  
</div>
{error_message}
  <button> Обменять</button>
</main>

<style>
main {
  height: 1000px;
}

.main-wrap{
  display: flex;
  flex-wrap: wrap;
}
.currency-wrap{
  display: block;
  width: 100%
}

.currency-form{
  position: absolute;
  height: 400px;
  overflow: auto;
}

.radio-wrap{
  display: flex;
}
</style>
