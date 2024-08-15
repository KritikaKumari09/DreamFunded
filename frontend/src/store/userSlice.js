import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  chat: null,
  groups: null,
  isOpen: false,
};
const userSilce = createSlice({
  name: "User",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.groups = null;
      state.chat = null;
    },
    toggleDrawer: (state,action)=>{
      state.isOpen = !(state.isOpen);
    },
    selectChat: (state, action) => {
      state.chat = action.payload;
    },
    removeChat: (state,action) =>{
      state.chat = null;
    }
    ,
    setGroup: (state, action)=>{
      state.groups = action.payload;
    },
    addMessage: (state, action)=>{
      // groupId --> from action.payload
      // message --> from action.message
      state.groups = state.groups.map((group, idx)=>{
        if(group._id == action.payload.groupId){
          return group = {...group,messages: [...group.messages, action.payload.message]};
        }
        else{
          return group;
        }
      })
    }
  },
});

export const { login, logout,selectChat,setGroup,addMessage,toggleDrawer,removeChat } = userSilce.actions;
export default userSilce.reducer;
