import MdBadge from './components/Badge'
import MdBreadcrumbs from './components/Breadcrumbs'
import MdBtn from './components/Button'
import MdCard from './components/Card'
import MdChip from './components/Chip'
import MdCircularPreloader from './components/CircularPreloader'
import MdCircularPreloaderLayer from './components/CircularPreloaderLayer'
import MdCollapsible from './components/Collapsible'
import MdCollapsibleItem from './components/CollapsibleItem'
import MdCollection from './components/Collection'
import MdCollectionItem from './components/CollectionItem'
import MdCollectionList from './components/CollectionList'
import MdCollectionListItem from './components/CollectionListItem'
import MdDropdown from './components/Dropdown'
import MdDropdownList from './components/DropdownList'
import MdDropdownItem from './components/DropdownItem'
import MdFab from './components/Fab'
// import MdCheckbox from './components/FormCheckbox'
// import MdCheckboxGroup from './components/FormCheckboxGroup'
// import MdInputFile from './components/FormInputFile'
// import MdInputText from './components/FormInputText'
// import MdOptgroup from './components/FormOptgroup'
// import MdOption from './components/FormOption'
// import MdRadio from './components/FormRadio'
// import MdRadioGroup from './components/FormRadioGroup'
// import MdSelect from './components/FormSelect'
// import MdSwitch from './components/FormSwitch'
// import MdTextarea from './components/FormTextarea'
import MdIcon from './components/Icon'
import MdImage from './components/Image'
import MdLeanOverlay from './components/LeanOverlay'
import MdLinearPreloader from './components/LinearPreloader'
// import MdModal from './components/Modal'
import MdNavbar from './components/Navbar'
import MdNavItem from './components/NavbarItem'
import MdPagination from './components/Pagination'
// import MdScrollNav from './components/ScrollNav'
import MdSidenav from './components/Sidenav'
import MdSidenavOverlay from './components/SidenavOverlay'
import MdSlide from './components/Slide'
import MdSlider from './components/Slider'
import MdTab from './components/Tab'
import MdTabs from './components/Tabs'

import MdInputText from './components/FormInputText'
import MdInputSelect from './components/FormInputSelect'

/**
 * @Vue     {Object} - Vue
 * @options {Object} - plugin options
 */
export default function install (Vue, options) {
  Vue.mixin({
    components: {

      MdBadge,

      MdBreadcrumbs,

      MdBtn,

      MdCard,

      MdChip,

      MdCircularPreloader,
      MdCircularPreloaderLayer,

      MdCollapsible,
      MdCollapsibleItem,

      MdCollection,
      MdCollectionItem,
      MdCollectionList,
      MdCollectionListItem,

      MdDropdown,
      MdDropdownList,
      MdDropdownItem,

      MdFab,

      MdIcon,
      MdImage,
      MdLeanOverlay,

      MdLinearPreloader,

      MdInputText,
      MdInputSelect,

      MdNavbar,
      MdNavItem,

      MdPagination,

      MdSidenav,
      MdSidenavOverlay,

      MdSlide,
      MdSlider,

      MdTab,
      MdTabs
    }
  })
}
