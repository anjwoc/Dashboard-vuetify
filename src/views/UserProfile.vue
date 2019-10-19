<template>
  <v-container
    fill-height
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form refs="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Company & College"
                    v-model="company"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="User Name"
                    v-model="userName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address(이메일 주소)"
                    class="purple-input"
                    v-model="email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="First Name(이름)"
                    class="purple-input"
                    v-model="firstName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Last Name(성)"
                    class="purple-input"
                    v-model="lastName"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress(주소)"
                    class="purple-input"
                    v-model="address"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="City(도시)"
                    class="purple-input"
                    v-model="city"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Country(국가)"
                    class="purple-input"
                    v-model="country"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Postal Code(우편번호)"
                    type="number"
                    v-model="postalCode"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    v-model="aboutMe"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn color="success">
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <material-card class="v-card-profile">
          <v-avatar
            slot="offset"
            class="mx-auto d-block elevation-6"
            size="130"
          >
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="font-weight-light">
              Alec Thompson
            </h4>

            <p class="font-weight-light">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

            <v-btn color="success">
              Follow
            </v-btn>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        valid:false,
        company:'',
        userName:'',
        email:'',
        firstName:'',
        lastName:'',
        address:'',
        city:'',
        country:'',
        postalCode:'',
        aboutMe:'',
      }
    },
    methods: {
      onSubmitForm(){
        if(this.$refs.form.validate()){
          this.$store.dispatch('users/updateProfile',{
            company : this.company,
            userName : this.userName,
            email : this.email,
            firstName : this.firstName,
            lastName : this.lastName,
            address : this.address,
            city : this.city,
            country : this.country,
            postalCode : this.postalCode,
            aboutMe : this.aboutMe,
          })
          .then(()=>{
            this.company = '';
            this.userName = '';
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            this.address = '';
            this.city = '';
            this.country = '';
            this.postalCode = '';
            this.aboutMe = '';
          })
          .catch((err)=>{
            console.error(err);
          });
        }
      },
      onChangeImages(e){

      }

    }
  }
</script>
