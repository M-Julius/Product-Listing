import { Pressable, ScrollView, Text } from "react-native";
import { Category } from "../types/Category";
import { useAppDispatch } from "../redux/store";
import { fetchProductsByCategory } from "../redux/productSlice";

interface Props {
    categories: Category[];
    selected: string | null;
    onSelected: (category: Category) => void;
}

const CategorySelecting: React.FC<Props> = ({ categories, selected, onSelected }) => {
    const dispatch = useAppDispatch();

    const onSelecting = (category: Category) => {
        onSelected(category);
        dispatch(fetchProductsByCategory(category.slug));
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => {
                const first = index === 0;
                const last = index === categories.length - 1;
                const spaceCategory = 8;
                const isSelected = selected === item.slug;

                return (
                    <Pressable key={index} onPress={onSelecting.bind(null, item)}
                        style={{
                            ...styles.item,
                            marginLeft: first ? 20 : spaceCategory,
                            marginRight: last ? 20 : spaceCategory,
                            borderColor: isSelected ? 'black' : 'gray',
                            backgroundColor: isSelected ? 'black' : 'white'
                        }}>
                        <Text style={{
                            ...styles.textName,
                            color: isSelected ? 'white' : 'gray'
                        }}>{item.name}</Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = {
    item: {
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 1,
        paddingVertical: 10,
    },
    textName: {
        marginHorizontal: 10,
        fontSize: 16,
    }
}


export default CategorySelecting;