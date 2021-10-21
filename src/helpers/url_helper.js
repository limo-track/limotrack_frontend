//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//misc
export const GET_counts = '/counts';

//devices
export const GET_devices = '/devices';
export const POST_createDevice = '/devices';
export const PUT_updateDevice = '/devices';
export const DELETE_RemoveDevice = '/devices/remove';
export const GET_deviceTypes = '/devices/types'
export const GET_freeDevices = '/devices/freeDevices'

//User
export const LOGIN = "/user/login";
export const GET_AllUsers = "/user/";
export const POST_creatUser = '/user/';
export const DELETE_user = '/user/remove';
export const PUT_updateUser = '/user';
export const Patch_changePassword = '/user'

//accounts
export const GET_Accounts = '/accounts';
export const GET_AccountById = '/accounts';
export const POST_createAccount = '/accounts';
export const PUT_updateAccount = '/accounts';
export const DELETE_removeAccount = '/accounts/remove';

//groups
export const GET_GroupsByAccount = '/groups'
export const POST_createGroup = '/groups';
export const PUT_updateGroup = '/groups';
export const DELETE_removeGroup = '/groups/remove';
export const GET_getGroupById = '/groups/by_id';

// Paths
export const paths = '/paths'
export const POST_removePaths = '/paths/remove'

// Cars
export const POST_CreateCar = '/cars';
export const GET_cars = '/cars';
export const POST_removeCars = '/cars/removeCars';
export const GET_ById = '/cars/by_id';

//drivers
export const GET_group_drivers = '/drivers'
export const DELETE_drivers = '/drivers'
export const CREATE_drivers = '/drivers/create'
export const UPDATE_driver = '/drivers/'

export const POST_FAKE_JWT_LOGIN = ''
export const POST_FAKE_JWT_PASSWORD_FORGET=''
//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"
export const POST_FAKE_LOGIN = ''
export const POST_FAKE_PASSWORD_FORGET = ''
export const SOCIAL_LOGIN = ''
//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"