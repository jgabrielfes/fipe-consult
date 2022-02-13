const readingData = (select, data) => {
  if (!select || !data) return new Error('Não há select nem dados');
  data.forEach(({ nome, codigo }) => {
    addItemInSelection(select, nome, codigo);
  });
};

module.exports = readingData;
