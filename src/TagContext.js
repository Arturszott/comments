import React, { useState, useMemo, useContext } from 'react';

const TagContext = React.createContext([]);

const defaultTags = [
	{ id: 0, name: 'SuperFan' },
	{ id: 1, name: 'Thank You' },
	{ id: 2, name: 'SPAM' },
	{ id: 3, name: 'Disgusting' },
	{ id: 4, name: 'Profanity' },
	{ id: 5, name: 'Needs Explanation' },
	{ id: 6, name: 'Feedback' }
];

const defaultTagsById = defaultTags.reduce((allTags, tag) => {
	return { ...allTags, [tag.id]: tag };
}, {});

function TagContextProvider(props) {
	const [tags, setTags] = useState(defaultTags);
	const [tagsById, setTagsById] = useState(defaultTagsById);

	const value = useMemo(
		() => ({
			getSuggestions(string) {
				return tags.filter((tag) => tag.name.includes(string));
			},
			addNewTag(name) {
				const newTag = { id: tags.length, name };

				setTags([...tags, newTag]);
				setTagsById({
					...tagsById,
					[newTag.id]: newTag
				});
			},
			tagsById
		}),
		[tags]
	);

	return <TagContext.Provider value={value}>{props.children}</TagContext.Provider>;
}

export const useTagContext = () => {
	return useContext(TagContext);
};

export default React.memo(TagContextProvider);
