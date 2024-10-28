<template>
  <div class="cl-validate-wrap cl-flexcc">
    <div class="cl-validateBox">
      <div class="cl-title" v-html="$t('validate.title')" />
      <div class="cl-content">
        <div class="cl-item">
          <div class="cl-input">
            <input
              type="text"
              :class="{ 'cl-firstName': isFirstName }"
              v-model="firstName"
              :placeholder="$t('validate.firstName')"
            />
          </div>
        </div>
        <div class="cl-item">
          <div class="cl-input">
            <input
              type="text"
              :class="{ 'cl-lastName': isLastName }"
              v-model="lastName"
              :placeholder="$t('validate.surname')"
            />
          </div>
        </div>

        <div class="cl-selectBox">
          <select name="idType" id="idType" v-model="idType">
            <option
              v-for="(a, b) in $t('validate.idType')"
              :key="b"
              :value="$t('validate.idType')[b].id"
            >
              {{ $t('validate.idType')[b].name }}
            </option>
          </select>
        </div>

        <div class="cl-item">
          <div class="cl-input">
            <input
              type="text"
              :class="{ 'cl-idBorder': isId }"
              v-model="id"
              :placeholder="$t('validate.idType')[idType].name"
            />
          </div>
          <div class="cl-reminder">{{ reminder }}</div>
        </div>

        <div class="cl-itemTitle">
          {{ $t('validate.location') }}
        </div>

        <div class="cl-selectBox">
          <select name="location" id="location" v-model="locationIndex">
            <option v-for="(a, b) in location" :key="b" :value="b">
              {{ a }}
            </option>
          </select>
        </div>

        <div class="cl-itemTitle">
          {{ $t('validate.nationality') }}
        </div>

        <div class="cl-selectBox">
          <select name="country" id="country" v-model="countryIndex">
            <option v-for="(a, b) in country" :key="b" :value="b">
              {{ a }}
            </option>
          </select>
        </div>
      </div>

      <div class="cl-bottomFoot">
        <div class="cl-button cl-flexcc" @click="submit">
          {{ $t('validate.submit') }}
        </div>
        <div class="cl-notNow cl-flexcc" @click="close">
          {{ $t('validate.notNow') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      country: [
        'Ugandan',
        'Afghan',
        'Albanian',
        'Algerian',
        'USA',
        'Andorran',
        'Angolan',
        'Antiguans',
        'Argentinean',
        'Armenian',
        'Australian',
        'Austrian',
        'Azerbaijani',
        'Bahamian',
        'Bahraini',
        'Bangladeshi',
        'Barbadian',
        'Barbudans',
        'Batswana',
        'Belarusian',
        'Belgian',
        'Belizean',
        'Beninese',
        'Bhutanese',
        'Bolivian',
        'Bosnian',
        'Brazilian',
        'British',
        'Bruneian',
        'Bulgarian',
        'Burkinabe',
        'Burmese',
        'Burundian',
        'Cambodian',
        'Cameroonian',
        'Canadian',
        'Cape Verdean',
        'Central African',
        'Chadian',
        'Chilean',
        'Chinese',
        'Colombian',
        'Comoran',
        'Congolese',
        'Congolese',
        'Costa Rican',
        'Croatian',
        'Cuban',
        'Cypriot',
        'Czech',
        'Danish',
        'Djibouti',
        'Dominican',
        'Dominican',
        'Dutch',
        'East Timorese',
        'Ecuadorean',
        'Egyptian',
        'Emirian',
        'Equatorial Guinean',
        'Eritrean',
        'Estonian',
        'Ethiopian',
        'Fijian',
        'Filipino',
        'Finnish',
        'French',
        'Gabonese',
        'Gambian',
        'Georgian',
        'German',
        'Ghanaian',
        'Greek',
        'Grenadian',
        'Guatemalan',
        'Guinea-Bissauan',
        'Guinean',
        'Guyanese',
        'Haitian',
        'Herzegovinian',
        'Honduran',
        'Hungarian',
        'I-Kiribati',
        'Icelander',
        'Indian',
        'Indonesian',
        'Iranian',
        'Iraqi',
        'Irish',
        'Irish',
        'Israeli',
        'Italian',
        'Ivorian',
        'Jamaican',
        'Japanese',
        'Jordanian',
        'Kazakhstani',
        'Kenyan',
        'Kittian and Nevisian',
        'Kuwaiti',
        'Kyrgyz',
        'Laotian',
        'Latvian',
        'Lebanese',
        'Liberian',
        'Libyan',
        'Liechtensteiner',
        'Lithuanian',
        'Luxembourger',
        'Macedonian',
        'Malagasy',
        'Malawian',
        'Malaysian',
        'Maldivan',
        'Malian',
        'Maltese',
        'Marshallese',
        'Mauritanian',
        'Mauritian',
        'Mexican',
        'Micronesian',
        'Moldovan',
        'Monacan',
        'Mongolian',
        'Moroccan',
        'Mosotho',
        'Motswana',
        'Mozambican',
        'Namibian',
        'Nauruan',
        'Nepalese',
        'Netherlander',
        'New Zealander',
        'Ni-Vanuatu',
        'Nicaraguan',
        'Nigerian',
        'Nigerien',
        'North Korean',
        'Northern Irish',
        'Norwegian',
        'Omani',
        'Pakistani',
        'Palauan',
        'Panamanian',
        'Papua New Guinean',
        'Paraguayan',
        'Peruvian',
        'Polish',
        'Portuguese',
        'Qatari',
        'Romanian',
        'Russian',
        'Rwandan',
        'Saint Lucian',
        'Salvadoran',
        'Samoan',
        'San Marinese',
        'Sao Tomean',
        'Saudi',
        'Scottish',
        'Senegalese',
        'Serbian',
        'Seychellois',
        'Sierra Leonean',
        'Singaporean',
        'Slovakian',
        'Slovenian',
        'Solomon Islander',
        'Somali',
        'South African',
        'South Korean',
        'Spanish',
        'Sri Lankan',
        'Sudanese',
        'Surinamer',
        'Swazi',
        'Swedish',
        'Swiss',
        'Syrian',
        'Taiwanese',
        'Tajik',
        'Tanzanian',
        'Thai',
        'Togolese',
        'Tongan',
        'Trinidadian or Tobagonian',
        'Tunisian',
        'Turkish',
        'Tuvaluan',
        'Ukrainian',
        'Uruguayan',
        'Uzbekistani',
        'Venezuelan',
        'Vietnamese',
        'Welsh',
        'Welsh',
        'Yemenite',
        'Zambian',
        'Zimbabwean'
      ],
      location: [
        'Kampala',
        'Abim',
        'Adjumani',
        'Agago',
        'Alebtong',
        'Amolatar',
        'Amudat',
        'Amuria',
        'Amuru',
        'Apac',
        'Arua',
        'Budaka',
        'Bududa',
        'Bugiri',
        'Buhweju',
        'Buikwe',
        'Bukedea',
        'Bukomansimbi',
        'Bukwa',
        'Bulambuli',
        'Buliisa',
        'Bundibugyo',
        'Bushenyi',
        'Busia',
        'Butaleja',
        'Butambala',
        'Buvuma',
        'Buyende',
        'Dokolo',
        'Gomba',
        'Gulu',
        'Hoima',
        'Ibanda',
        'Iganga',
        'Isingiro',
        'Jinja',
        'Kaabong',
        'Kabale',
        'Kabarole',
        'Kaberamaido',
        'Kalangala',
        'Kaliro',
        'Kalungu',
        'Kamuli',
        'Kamwenge',
        'Kanungu',
        'Kapchorwa',
        'Kasese',
        'Katakwi',
        'Kayunga',
        'Kibaale',
        'Kiboga',
        'Kibuku',
        'Kiruhura',
        'Kiryandongo',
        'Kisoro',
        'Kitgum',
        'Koboko',
        'Kole',
        'Kotido',
        'Kumi',
        'Kween',
        'Kyankwanzi',
        'Kyegegwa',
        'Kyenjojo',
        'Lamwo',
        'Lira',
        'Luuka',
        'Luweero',
        'Lwengo',
        'Lyantonde',
        'Manafwa',
        'Maracha',
        'Masaka',
        'Masindi',
        'Mayuge',
        'Mbale',
        'Mbarara',
        'Mitooma',
        'Mityana',
        'Moroto',
        'Moyo',
        'Mpigi',
        'Mubende',
        'Mukono',
        'Nakapiripirit',
        'Nakaseke',
        'Nakasongola',
        'Namayingo',
        'Namutumba',
        'Napak',
        'Nebbi',
        'Ngora',
        'Ntoroko',
        'Ntungamo',
        'Nwoya',
        'Otuke',
        'Oyam',
        'Pader',
        'Pallisa',
        'Rakai',
        'Rubirizi',
        'Rukungiri',
        'Sembabule',
        'Serere',
        'Sheema',
        'Sironko',
        'Soroti',
        'Tororo',
        'Wakiso',
        'Yumbe',
        'Zombo'
      ],
      firstName: '',
      lastName: '',
      id: '',
      idType: 0,
      countryIndex: 0,
      locationIndex: 0,
      reminder: '',
      isFirstName: false,
      isLastName: false,
      isId: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  watch: {
    firstName(val) {
      if (val) this.isFirstName = false
    },
    lastName(val) {
      if (val) this.isLastName = false
    },
    idType() {
      this.id = ''
    },
    id(val, oldVal) {
      if (this.idType === 0) {
        if (val.length > 14) {
          this.id = oldVal
        }
      } else if (this.idType === 1) {
        if (val.length > 9) {
          this.id = oldVal
        }
      }
    }
  },
  methods: {
    chooseIdType(item) {
      this.idType = item.id
    },
    chooseCountry(item, index) {
      this.countryIndex = index
    },
    close() {
      this.$emit('closeValidate')
    },
    userAccountInfo() {
      this.$axios_api
        .userAccountInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setAccountInfo', res.data)
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('reminder.validate'),
              this.$t('reminder.button.ok'),
              ''
            )
            this.close()
          }
        })
    },
    submit() {
      this.isFirstName = false
      this.isLastName = false
      this.isId = false
      this.reminder = ''

      if (!this.firstName) {
        this.isFirstName = true
        return
      }

      if (!this.lastName) {
        this.isLastName = true
        return
      }

      // 身份证号
      if (this.idType === 0) {
        if (!this.id) {
          this.isId = true
          this.reminder = this.$t('validate.reminder.national')
          return
        }
      }
      // 护照号
      if (this.idType === 1) {
        if (!this.id) {
          this.isId = true
          this.reminder = this.$t('validate.reminder.passport')
          return
        }
      }

      this.$axios_api
        .identity({
          token: this.token,
          type: this.idType + 1,
          first_name: this.firstName,
          last_name: this.lastName,
          national: this.country[this.countryIndex],
          location: this.location[this.locationIndex],
          number: this.id
        })
        .then((res) => {
          if (res.code === 0) {
            this.userAccountInfo()
          } else {
            // Lib.common.errorReminder(res.msg, this)
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              this.$t('reminder.button.ok'),
              ''
            )
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-validate-wrap {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  z-index: 19;
  margin: 0 auto;

  .cl-validateBox {
    width: 330rem/36;
    background-color: white;
    border-radius: 3rem/36;
    box-sizing: border-box;
    padding: 20rem/36 15rem/36;

    .cl-title {
      text-align: center;
      font-weight: bold;
      font-size: 12rem/36;
    }

    .cl-content {
      .cl-item {
        padding-top: 20rem/36;

        .cl-input {
          width: 300rem/36;
          position: relative;

          input {
            width: 280rem/36;
            height: 35rem/36;
            padding: 0 10rem/36;
            border: 1px solid #c9c9c9;
            margin: 0;
          }

          .cl-firstName {
            outline: 1px solid red;
            border: 1px solid red;
          }

          .cl-lastName {
            outline: 1px solid red;
            border: 1px solid red;
          }

          .cl-idBorder {
            outline: 1px solid red;
            border: 1px solid red;
          }

          ::placeholder {
            font-size: 12rem/36;
          }
        }

        .cl-reminder {
          padding-top: 3rem/36;
          color: red;
          font-size: 10rem/36;
        }
      }

      .cl-itemTitle {
        padding-top: 10rem/36;
      }

      .cl-selectBox {
        #idType {
          width: 300rem/36;
          margin-top: 20rem/36;
          height: 35rem/36;
          border: 1px solid #c9c9c9;
        }

        #country {
          width: 300rem/36;
          margin-top: 5rem/36;
          height: 35rem/36;
          border: 1px solid #c9c9c9;
        }

        #location {
          width: 300rem/36;
          margin-top: 5rem/36;
          height: 35rem/36;
          border: 1px solid #c9c9c9;
        }
      }
    }

    .cl-bottomFoot {
      .cl-button {
        color: #fff;
        background-color: #009944;
        font-weight: bold;
        font-size: 14rem/36;
        height: 40rem/36;
        border-radius: 3rem/36;
        margin-top: 20rem/36;
      }

      .cl-notNow {
        font-weight: bold;
        font-size: 14rem/36;
        color: #009944;
        height: 40rem/36;
        box-sizing: border-box;
        border: 1px solid #009944;
        border-radius: 3rem/36;
        margin-top: 10rem/36;
      }
    }
  }
}
</style>
