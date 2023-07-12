import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgb(100,244,222)"
  },
  header: {
    padding: 24,
    alignItems:'center',
    backgroundColor:"#dddfff",
    borderLeftWidth:10,
    borderBottomWidth:5,
    borderTopLeftRadius:15,
    borderTopRightRadius:10,
    borderBottomRightRadius:5,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
    height:55,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop:10,
    marginRight: 16,
    borderLeftWidth:10,
    borderBottomWidth:5,
    borderTopLeftRadius:15,
    borderTopRightRadius:10,
    borderBottomRightRadius:5,
  },
  addButton: {
    backgroundColor: "#73f",
    padding: 16,
    borderLeftWidth:10,
    borderBottomWidth:5,
    borderTopLeftRadius:15,
    borderTopRightRadius:10,
    borderBottomRightRadius:5,
  },
  addButtonText: {
    fontWeight: "bold",
    color: "#222"
  },
  item: {
    marginVertical: 10,
    backgroundColor:'#ccc' ,
    padding: 16,
    borderRadius: 8,
    justifyContent:"center",
    borderRightWidth:5,
    borderBottomWidth:5,
    borderTopRightRadius:20,
    borderRightRightRadius:10,
    borderTopRightRadius:5,
  },
  itemText: {
    color: "#222",
    fontWeight: "bold"
  },
  delButn:{
    backgroundColor:'rgb(230,50,100)',
    marginVertical: 10,
    padding: 16,
    borderTopLeftRadius:15,
    borderBottomRightRadius:15,
    borderRightWidth:1,
    borderBottomWidth:5,
    borderTopRightRadius:20,
    borderRightRightRadius:10,
    borderTopRightRadius:5,
  },
  rightAction:{
    flexDirection:'row',
    alignItems:'center',
    borderRadius:15
  },
  edit:{
    backgroundColor:'yellow',
    alignItems:'center',
    marginVertical: 10,
    padding: 16,
    borderTopLeftRadius:15,
    borderBottomRightRadius:15,
    
  },
  check:{
    backgroundColor:"green",
    alignItems:'center',
    marginVertical: 10,
    padding: 16,
    borderTopLeftRadius:15,
    borderBottomRightRadius:15,

    
  }

})
