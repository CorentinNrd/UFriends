<script setup lang="ts">
  import { useUserStore } from '../stores/userStore';

  const userStore = useUserStore();

  const { user } = useUserStore();

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 0) {
      nav?.classList.add('nav-sticky');
    } else {
      nav?.classList.remove('nav-sticky');
    }
  };
</script>

<template>
  <nav id="nav">
    <div class="nav">
      <ul v-if="userStore.isLogged">
        <li>
          <NuxtLink to="/" class="animated-link">Accueil</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mentors" class="animated-link">Nos mentors</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="animated-link">Contact</NuxtLink>
        </li>
        <li>
          <div class="menu-account">
            <p class="hover-submenu">{{ user.email }}</p>
            <ul class="submenu">
              <div class="flex flex-col">
                <NuxtLink to="/account" class="flex items-center">
                  <Icon name="material-symbols:account-circle" class="mr-1 w-5 h-5" />
                  Mon compte
                </NuxtLink>
                <NuxtLink to="/account" class="flex items-center">
                  <Icon name="material-symbols:supervisor-account-outline" class="mr-1 w-5 h-5" />
                  Mes élèves
                </NuxtLink>
                <NuxtLink @click="userStore.logoutUser()" class="flex items-center">
                  <Icon name="material-symbols:logout-rounded" class="mr-1 w-5 h-5" />
                  Déconnexion
                </NuxtLink>
              </div>
            </ul>
          </div>
        </li>
      </ul>
      <ul v-else-if="!userStore.isLogged">
        <li>
          <NuxtLink to="/login" class="animated-link">Connexion</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/register" class="animated-link">Inscription</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
  #nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: center;

    .nav {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50px;
      width: 100%;
      transition: all 0.4s;
      background-color: #7d7abc;
    }

    .nav-sticky {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50px;
      width: 95%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      margin-top: 5px;
      transition: all 0.4s;
    }

    ul {
      display: flex;
      list-style: none;
      gap: 15px;

      li {
        margin-right: 1rem;

        a {
          color: #fff;
          text-decoration: none;
        }

        .animated-link {
          color: #fff;
          cursor: pointer;
          position: relative;
          text-decoration: none;
        }

        .animated-link:after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1.5px;
          bottom: -3px;
          left: 0;
          background-color: #fff;
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }

        .animated-link:hover:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .menu-account {
          position: relative;

          .hover-submenu {
            cursor: pointer;
            color: #fff;
          }

          .submenu {
            position: absolute;
            top: 100%;
            left: 0;
            width: max-content;
            background-color: #fff;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            display: none;

            a {
              color: #000;
              padding: 5px 0;
              cursor: pointer;

              &:hover {
                color: #7d7abc;
                transition: 0.5ms;
              }
            }
          }

          &:hover {
            .submenu {
              display: block;
              animation: fadeIn 0.3s ease-in-out;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      }
    }
  }
</style>
