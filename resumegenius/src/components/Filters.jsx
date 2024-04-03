import React, { useState } from 'react';
import { MdLayersClear } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { slideDownWithScale } from '../animations';
import { FiltersData } from '../utils/helpers';
import useFilters from '../hooks/useFilters';
import { useQueryClient } from 'react-query';

const Filters = () => {
  const [isHover, setIsHover] = useState(false);

  const { data: filterData = { searchTerm: '' }, isLoading, isError } = useFilters();

  const queryClient = useQueryClient();

  const handleFilterValue = (value) => {
    queryClient.setQueryData('globalFilter', {
      ...queryClient.getQueryData('globalFilter'),
      searchTerm: value,
    });
  };

  const clearFilter = () => {
    queryClient.setQueryData('globalFilter', {
      ...queryClient.getQueryData('globalFilter'),
      searchTerm: '',
    });
  };

  return (
    <div className='w-full flex items-center justify-start py-4'>
      <div
        className='border border-red-400 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-red-300 relative'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <MdLayersClear className='text-xl' />
        <AnimatePresence>
          {isHover && (
            <motion.div
              onClick={clearFilter}
              {...slideDownWithScale}
              className='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'>
              <p className='whitespace-nowrap text-lg'>Clear All</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none'>
        {FiltersData &&
          FiltersData.map((item) => (
            <div
              onClick={() => handleFilterValue(item.value)}
              key={item.id}
              className={`border border-white rounded-xl px-6 py-2 cursor-pointer group hover:shadow-md group hover:bg-blue-700 ${
                filterData?.searchTerm === item.value ? 'bg-blue-700' : 'bg-black'
              }`}>
              <p className='text-xl text-white whitespace-nowrap'>{item.label}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filters;
