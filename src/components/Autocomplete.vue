<template>
    <div class="ta">
        <div class="ta__toggle input-field" ref="toggle" @mousedown.prevent="toggle">
            <input type="text" class="ta__search" ref="search" name="search" autocomplete="listing-zipcode"
                v-model="search"
                @focus="onFocus"
                @blur="onBlur"
                @keydown="invisiblePlaceholder"
                @keydown.esc="onEscape"
                @keydown.down="onDownKey"
                @keydown.up="onUpKey"
                @keydown.enter="onEnterKey"
                >
            <label for="search">Postcode</label>
            <span class="ta__text" ref="text">{{displayText}}</span>
            <span class="input-error-msg">Dit veld is verplicht in te vullen.</span>
        </div>
        <transition name="fade">
            <ul class="ta__list" ref="list" v-if="open">
                <li class="ta__item" v-for="(option, index) in filteredOptions" :key="index">
                    <a class="ta__link" @mousedown.prevent="select(option)"
                        :class="[selectIndex === index ? 'ta__active':'']"
                        >
                        {{ option.zip }} - {{ option.city }}
                    </a>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'autocomplete',
        props: {
            options: {
                type: Array,
                default () {
                    return []
                }
            },
            value: {
                type: [String, Number],
                default: null
            },
            autofill: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                open: false,
                selectIndex: 0,
                displayText: 'Kies je postcode',
                search: ''
            }
        },
        created() {
            if (this.autofill != null) {
                this.displayText = this.autofill
            }
        },
        computed: {
            typeaheadState() {
                return this.open ? 'ta ta__open' : 'ta'
            },
            filteredOptions() {
                const exp = new RegExp(this.search, 'i')
                return this.options.filter((option) => {
                    return (exp.test(option.zip) || exp.test(option.city))
                })
            }
        },
        methods: {
            onDownKey() {
                if (this.filteredOptions.length - 1 > this.selectIndex) {
                    this.selectIndex++

                        // scroll when overflow
                        if (this.selectIndex > 2) {
                            this.$refs.list.scrollTop += (20 + this.selectIndex)
                        }
                }
            },
            onUpKey() {
                if (this.selectIndex > 0) {
                    this.selectIndex--

                        // scroll when overflow
                        if (this.selectIndex > 0) {
                            this.$refs.list.scrollTop -= (20 + this.selectIndex)
                        }
                }
            },
            onEnterKey() {
                const option = this.filteredOptions[this.selectIndex]

                if (option) {
                    this.select(option)
                }
            },
            select(option) {
                this.displayText = option.zip + ' - ' + option.city,
                    this.$emit('autocomplete', option)
                this.$refs.search.blur()
            },
            toggle(e) {
                if (e.target === this.$refs.toggle ||
                    e.target === this.$refs.search ||
                    e.target === this.$refs.text) {

                    if (this.open) {
                        if (e.target !== this.$refs.search &&
                            e.target !== this.$refs.text) {
                            this.$refs.search.blur()
                        }
                    } else {
                        this.$refs.search.focus()
                    }
                }
            },
            onFocus() {
                this.open = true
                event.target.parentElement.classList.add('active')
                event.target.removeAttribute('readonly')
            },
            onBlur() {
                this.search = ''
                this.selectIndex = 0
                this.$refs.list.scrollTop = 0
                this.open = false
                event.target.parentElement.classList.remove('active', 'keydown')
            },
            onEscape() {
                this.$refs.search.blur()
            },
            invisiblePlaceholder(){
                event.target.parentElement.classList.add('keydown')    
            } 
        }
    }

</script>
